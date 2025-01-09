import React, { useState, useEffect, useRef } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  EuiBasicTable,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  useGeneratedHtmlId,
  EuiButton,
  EuiButtonEmpty,
  EuiPagination,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
} from '@elastic/eui';
import useApi from '../../utils/useApi';
import QuestionFilter from '../Form/QuestionFilter';

export default NiceModal.create(({ bankId }) => {
  const modal = useModal();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const filters = useRef({subject_id: 0, chapter_id: 0, q: ""});

  const { getQuestions, addQuestionBankItems } = useApi();

  const [selectedItems, setSelectedItems] = useState([]);
  const onSelectionChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const selection = {
    selectable: (q) => q.qb_item_id === null,
    onSelectionChange,
    initialSelected: [],
  };

  const columns = [
    {
      field: 'id',
      name: 'ID',
      width: '50px',
    },
    {
      field: 'content',
      name: 'Câu hỏi',
      valign: 'top',
      render: (content, q) => {
        return (
          <div>
            <div>{content['content']}</div>
            <EuiBadge>{q.subject_name}</EuiBadge>
            <EuiBadge color="#666">{q.chapter_name}</EuiBadge>
            {q.B1 && <EuiBadge>B1</EuiBadge>}
            {q.B2 && <EuiBadge>B2</EuiBadge>}
            {q.C && <EuiBadge>C</EuiBadge>}
            {q.DEF && <EuiBadge>DEF</EuiBadge>}
          </div>
        );
      },
    },
  ];

  const closeFlyout = () => {
    modal.remove();
  };

  const onSave = async () => {
    const items = selectedItems.map((i) => {
      return {
        bank_id: bankId,
        question_id: i.id,
      };
    });
    await addQuestionBankItems(bankId, items);
    modal.resolve(items);
    closeFlyout();
  };

  const complicatedFlyoutTitleId = useGeneratedHtmlId();

  const loadQuestions = async (currentPage) => {
    const response = await getQuestions({ ...filters.current, bank_id: bankId, page: currentPage });
    setData(response.data.items);
    const p = Math.ceil(response.data.total / response.data.size);
    if (p <= 1) {
      setPageCount(1);
    } else {
      setPageCount(p);
    }
  }

  useEffect(() => { 
    loadQuestions(page);
  }, [page]);

  const doSearch = (params) => {
    filters.current = params;
    loadQuestions(1);
    setPage(1);
  }

  return (
    <EuiFlyout ownFocus onClose={closeFlyout} hideCloseButton aria-labelledby={complicatedFlyoutTitleId}>
      <EuiFlyoutHeader hasBorder>
        <QuestionFilter onSearch={doSearch} />
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiBasicTable
          tableCaption="Danh sách câu hỏi"
          items={data}
          itemId="id"
          columns={columns}
          selection={selection}
        />
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty iconType="cross" onClick={closeFlyout} flush="left">
              Đóng
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiPagination pageCount={pageCount} activePage={page - 1} onPageClick={(p) => setPage(p + 1)} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={onSave} fill disabled={selectedItems.length === 0}>
              Thêm
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
});
