import React, { useState, useEffect } from "react";
import {
  EuiBasicTable,
  formatDate,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiPagination,
  EuiPageTemplate,
  EuiPage,
  EuiFieldText,
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiPanel,
} from "@elastic/eui";
import { Link } from "react-router-dom"; // Nhập Link từ react-router-dom
import KibanaLayout from "../../layouts/kibana";
import useApi from "../../utils/useApi";

const Courses = () => {
  const [data, setData] = useState([]);
  const { getCourses } = useApi();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const columns = [
    {
      field: "id",
      name: "ID",
      render: (courseId) => (
        <Link to={`/exam/${courseId}`}>
          {" "}
          {/* Sử dụng Link để truyền courseId vào URL */}
          {courseId}
        </Link>
      ),
    },
    {
      field: "ma_khoa_hoc",
      name: "Mã khoá",
    },
    {
      field: "ten_khoa_hoc",
      name: "Tên khoá",
    },
    {
      field: "so_hoc_sinh",
      name: "Số HS",
    },
    {
      field: "ngay_khai_giang",
      name: "Khai giảng",
      render: (date) => formatDate(date, "DD/MM/YYYY"),
    },
    {
      field: "ngay_be_giang",
      name: "Bế giảng",
      render: (date) => formatDate(date, "DD/MM/YYYY"),
    },
  ];

  const fetchData = async () => {
    const response = await getCourses({});
    console.log(response);
    setData(response.data.items);
    const p = Math.ceil(response.data.total / response.data.size);
    setPageCount(p > 0 ? p : 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EuiPageTemplate restrictWidth={false}>
      <EuiPageTemplate.Header
        pageTitle="Danh sách khoá học"
        iconType="logoKibana"
        bottomBorder={false}
      />
      {/* <EuiPageTemplate.Section>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
              <EuiFormRow label="Tên khoá học">
                <EuiFieldText
                  placeholder="Nhập tên khoá học"
                  aria-label="Nhập tên khoá học"
                />
              </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
              <EuiFormRow label="Tên khoá học">
                <EuiFieldText
                  placeholder="Nhập tên khoá học"
                  aria-label="Nhập tên khoá học"
                />
              </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
              <EuiFormRow label="Tên khoá học">
                <EuiFieldText
                  placeholder="Nhập tên khoá học"
                  aria-label="Nhập tên khoá học"
                />
              </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageTemplate.Section> */}
      <EuiPageTemplate.Section>
        <EuiPanel>
        <EuiBasicTable
          tableCaption="Danh sách khoá học"
          items={data}
          itemId="id"
          columns={columns}
          noItemsMessage="Không có khoá học nào"
        />
        <EuiSpacer size="s" />
        <EuiFlexGroup justifyContent="spaceAround">
          <EuiFlexItem grow={false}>
            <EuiPagination
              pageCount={pageCount}
              activePage={page - 1}
              onPageClick={(p) => setPage(p + 1)} // Cập nhật trang hiện tại
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        </EuiPanel>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Courses;
