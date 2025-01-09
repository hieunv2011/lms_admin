import React, {useState, useEffect } from 'react';
import {
  EuiBasicTable,
  EuiLink,
  EuiButton
} from '@elastic/eui';
import KibanaLayout from '../../layouts/kibana';
import useApi from '../../utils/useApi';
import NiceModal from '@ebay/nice-modal-react';


const QuestionBanks = () => {
  const [data, setData] = useState([])  
  const [searchQuery, setSearchQuery] = useState('');
  const {getQuestionBanks} = useApi()

  const actions = [
    {
      name: 'Edit',
      isPrimary: true,
      description: 'Sửa thông tin',
      icon: 'pencil',
      type: 'icon',
      enabled: (qb) => qb.is_owner,
      onClick: (qb) => {
        NiceModal.show('edit-question-bank', { qb }).then(() => {
            fetchData();
        })
      }
    },
    {
        name: 'Delete',
        description: 'Xoá',
        icon: 'trash',
        type: 'icon',
        color: 'danger',
        enabled: (qb) => qb.is_owner,
        onClick: (qb) => {
          
        }
      }
  ];

  const columns = [
    {
      field: 'id',
      name: 'ID',
      truncateText: false,
      width: '50px',
      mobileOptions: {
        width: '100%',
        enlarge: true,
        truncateText: false,
      }
    },
    {
      field: 'name',
      name: 'Tên bộ đề',
      render: (name, qb) => {
        return <EuiLink href={`/qb/${qb.id}`}>{name}</EuiLink>
      }
    },
    {
      field: 'hang',
      name: 'Hạng',
    },
    {
      field: 'type',
      name: 'Loại',
      render: (type) => {
        if (type == 0) {
          return "Đề cố định";
        } else {
          return "Bộ đề ngẫu nhiên";
        }
      }
    },
    {
      field: 'num_of_questions',
      name: 'Số câu hỏi'
    },
    {
      field: 'note',
      name: 'Ghi chú',
      width: '200px'
    },
    {
      field: 'updated_date',
      name: 'Cập nhật'
    },
    {
      name: 'Actions',
      actions,
    }
  ];

  const addQuestionBank = () => {
    const qb = {
        id: 0,
        name: "",
        type: 0,
        note: "",
        hang: ""
    }
    NiceModal.show('edit-question-bank', {qb}).then(() => {
        fetchData();
    })
  }

  const fetchData = async (q) => {
    const response = await getQuestionBanks("");
    setData(response.data.items);
  }

  useEffect(() => {
    fetchData(searchQuery);
  }, [])

  return (
    <>
      <EuiBasicTable
        tableCaption="Danh sách bộ đề"
        items={data}
        itemId="id"
        columns={columns}
      />
      <EuiButton fill onClick={addQuestionBank}>Thêm bộ đề</EuiButton>
    </>
  );
}

export default QuestionBanks;