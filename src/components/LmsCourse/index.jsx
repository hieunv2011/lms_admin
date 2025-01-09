import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  EuiBasicTable,
  EuiBadge,
  EuiButton,
  EuiPanel,
  EuiPageHeader,
  EuiPageSection,
  EuiSpacer,
  EuiPageBody,
  EuiLink,
} from "@elastic/eui";
import useApi from "../../utils/useApi";
import { render } from "@testing-library/react";

const LmsCourse = () => {
  const [data, setData] = useState([]);
  const { getLmsExams } = useApi();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      field: "id",
      name: "ID",
      width: "80px",
    },
    {
      field: "name",
      name: "Tên bài giảng",
      width: "250px",
      render: (name, item) => {
        return <EuiLink href={`/lmscourse/${item.id}`}>{name}</EuiLink>;
      },
    },
    {
      field: "ma_khoa",
      name: "Mã khoá",
    },
    {
      field: "ten_khoa",
      name: "Tên khoá",
    },
    {
      field: "hang",
      name: "Hạng",
    },
    {
      field: "bat_dau",
      name: "Ngày bắt đầu",
    },
    {
      field: "ket_thuc",
      name: "Ngày kết thúc",
    },
    {
      field: "status",
      name: "Trạng thái",
      render: (status) => (
        <EuiBadge color={status === 1 ? "success" : "hollow"}>
          {status === 1 ? "Công bố" : "Nháp"}
        </EuiBadge>
      ),
    },
    {
      field: "description",
      name: "Ghi chú",
      width: "200px",
    },
    {
      field: "actions",
      name: "Thao tác",
    },
    {
      field: "actions",
      name: "Thao tác",
      actions: [
        {
          name: "Chỉnh sửa",
          description: "Chỉnh sửa bài giảng",
          icon: "pencil",
          type: "icon",
          onClick: (item) => {
            // Gọi hàm chỉnh sửa với item
            console.log("Chỉnh sửa:", item);
          },
        },
        {
          name: "Xóa",
          description: "Xóa bài giảng",
          icon: "trash",
          color: "danger",
          type: "icon",
          onClick: (item) => {
            // Gọi hàm xóa với item
            console.log("Xóa:", item);
          },
        },
      ],
    },
  ];

  const fetchData = async () => {
    const response = await getLmsExams({});
    // console.log(response);
    setData(response.data.items);
    const p = Math.ceil(response.data.total / response.data.size);
    setPageCount(p > 0 ? p : 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <EuiPageHeader
        pageTitle="Danh sách bài giảng"
        iconType="logoKibana"
        bottomBorder={true}
        restrictWidth={false}
        description="Danh sách các bài giảng lý thuyết của trung tâm ABCDXYZ"
        rightSideItems={[<EuiButton fill>Tạo mới bài giảng</EuiButton>]}
      />
      <EuiSpacer />
      <EuiPanel>
        <EuiPageSection>
          <EuiBasicTable
            tableCaption="Danh sách bài giảng"
            items={data}
            itemId="id"
            columns={columns}
            noItemsMessage="Không có bài giảng nào"
          />
        </EuiPageSection>
      </EuiPanel>
    </>
  );
};

export default LmsCourse;
