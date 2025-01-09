import React, { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiSuperSelect,
    EuiText,
    useGeneratedHtmlId,
  } from '@elastic/eui';
import useApi from '../../utils/useApi';

export default NiceModal.create(({ qb }) => {
    const {createQuestionBank, updateQuestionBank} = useApi()
    const modal = useModal();

    const [qbName, setQBName] = useState(qb.name)
    const onQBNameChange = (e) => {
        setQBName(e.target.value);
    }

    const [qbNote, setQBNote] = useState(qb.note)
    const onQBNoteChange = (e) => {
        setQBNote(e.target.value);
    }

    const [qbType, setQBType] = useState(qb.type);
    const onQBTypeSelectChange = (value) => {
        setQBType(value);
    };

    const [qbHang, setQBHang] = useState(qb.hang);
    const onQBHangSelectChange = (value) => {
        setQBHang(value);
    };

    const modalTitleId = useGeneratedHtmlId();
    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

    const onSave = async () => {
        if (qb.id == 0) {
            await createQuestionBank(qbName, qbType, qbNote, qbHang);
        } else {
            await updateQuestionBank(qb.id, qbName, qbType, qbNote, qbHang);
        }
        modal.resolve(qb);
        hideModal();
    }

    const hideModal = () => {
        modal.remove();
    }

    const qbTypeSelectOptions = [
      {
        value: 0,
        inputDisplay: 'Đề cố định',
        dropdownDisplay: (
          <>
            <strong>Đề cố định</strong>
            <EuiText size="s" color="subdued">
              <p>Bài thi sẽ sử dụng tất cả các câu hỏi từ đề</p>
            </EuiText>
          </>
        ),
      },
      {
        value: 1,
        inputDisplay: 'Đề ngẫu nhiên',
        dropdownDisplay: (
          <>
            <strong>Đề ngẫu nhiên</strong>
            <EuiText size="s" color="subdued">
              <p>Bài kiểm tra sẽ lấy ngẫu nhiên 1 số câu hỏi</p>
            </EuiText>
          </>
        ),
      }
    ];

    const qbHangSelectOptions = [
      {
        value: "",
        inputDisplay: 'Không phân loại',
        dropdownDisplay: (<strong>Không phân loại</strong>),
      },
      {
        value: "B1",
        inputDisplay: 'B1',
        dropdownDisplay: (<strong>B1</strong>),
      },
      {
        value: "B2",
        inputDisplay: 'B2',
        dropdownDisplay: (<strong>B2</strong>),
      },
      {
        value: "C",
        inputDisplay: 'C',
        dropdownDisplay: (<strong>C</strong>),
      },
      {
        value: "DEF",
        inputDisplay: 'DEF',
        dropdownDisplay: (<strong>DEF</strong>),
      }
    ];

    return (
      <EuiModal
          aria-labelledby={modalTitleId}
          onClose={hideModal}
          initialFocus="[name=popswitch]"
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
                Bộ đề
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
                <EuiFormRow label="Tên bộ đề">
                    <EuiFieldText name="name" value={qbName} onChange={onQBNameChange} />
                </EuiFormRow>
                <EuiFormRow label="Loại bộ đề">
                    <EuiSuperSelect
                        options={qbTypeSelectOptions}
                        valueOfSelected={qbType}
                        onChange={(value) => onQBTypeSelectChange(value)}
                        itemLayoutAlign="top"
                        hasDividers
                    />
                </EuiFormRow>
                <EuiFormRow label="Hạng">
                    <EuiSuperSelect
                        options={qbHangSelectOptions}
                        valueOfSelected={qbHang}
                        onChange={(value) => onQBHangSelectChange(value)}
                        itemLayoutAlign="top"
                        hasDividers
                    />
                </EuiFormRow>
                <EuiFormRow label="Ghi chú">
                    <EuiFieldText name="note" value={qbNote} onChange={onQBNoteChange} />
                </EuiFormRow>
            </EuiForm>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton
              type="button"
              onClick={onSave}
              fill
            >
              Ghi
            </EuiButton>
            <EuiButtonEmpty onClick={hideModal}>Đóng</EuiButtonEmpty>
          </EuiModalFooter>
        </EuiModal>
    );
  });