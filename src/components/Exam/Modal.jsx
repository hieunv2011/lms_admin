import React, { useState, Fragment, useEffect } from "react";
import useApi from "../../utils/useApi";

import {
  EuiPanel,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiSpacer,
  EuiFieldText,
  EuiFormRow,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiRange,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiFieldNumber,
  EuiSearchBar,
  EuiCallOut,
  EuiBasicTable,
  EuiSuperSelect,
  EuiBadge,
} from "@elastic/eui";
import moment from "moment";

const Modal = ({ closeModal, exam, fetchExams }) => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const {
    updateCourseExam,
    createCourseExam,
    getQuestionBanks,
    getCourseExamQuestionBanks,
    updateCourseExamQuestionBanks,
  } = useApi();
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //Date
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, "d"));
  //Fragment
  const [query, setQuery] = useState("");
  const [incremental, setIncremental] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  //Options
  const examTypeSelectOptions = [
    {
      value: 0,
      inputDisplay: "Đề cố định",
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
      inputDisplay: "Đề ngẫu nhiên",
      dropdownDisplay: (
        <>
          <strong>Đề ngẫu nhiên</strong>
          <EuiText size="s" color="subdued">
            <p>Bài kiểm tra sẽ lấy ngẫu nhiên 1 số câu hỏi</p>
          </EuiText>
        </>
      ),
    },
  ];
  //Question Bank option
  const [questionBankOptions, setQuestionBankOptions] = useState([]);
  const buildQuestionBanks = async () => {
    let linkMap = {};
    if (exam.id > 0) {
      const qbLinkResponse = await getCourseExamQuestionBanks(exam.id);
      qbLinkResponse.data.items.forEach((item) => {
        linkMap[item.id] = item;
      });
    }

    const qbResponse = await getQuestionBanks("");
    const qbOptions = qbResponse.data.items.map((b) => {
      return {
        id: b.id,
        label: b.name,
        append: <EuiBadge>{b.num_of_questions}</EuiBadge>,
        disabled: b.num_of_questions == 0,
        checked: linkMap[b.id] ? "on" : "undefined",
      };
    });
    setQuestionBankOptions(qbOptions);
  };
  useEffect(() => {
    buildQuestionBanks();
  }, []);

  useEffect(() => {
    const fetchQuestionBanks = async () => {
      try {
        const response = await getQuestionBanks();
        setQuestionBanks(response.data.items);
      } catch (err) {
        console.error("Error fetching question banks:", err);
      }
    };
    fetchQuestionBanks();
  }, [getQuestionBanks]);

  const [editedExam, setExam] = useState({
    ...exam,
    start_date: moment(exam.start_date),
    end_date: moment(exam.end_date),
  });

  const onExamPropChange = (prop, value) => {
    setExam({ ...editedExam, [prop]: value });
  };

  //cập nhật, tạo
  const onSave = async () => {
    const qbItems = questionBankOptions.map((b) => b.id);
    if (exam.id == 0) {
      const response = await createCourseExam(editedExam);
      editedExam.id = response.data.id;
    } else {
      await updateCourseExam(exam.id, editedExam);
    }
    await updateCourseExamQuestionBanks(editedExam.id, qbItems);
    fetchExams();
    closeModal();
  };

  const onChange = ({ query, error, filters }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const onSelectionChange = (newOptions) => {
    setQuestionBankOptions(newOptions);
  };

  const logSelectedItems = () => {};

  const renderSearch = () => {
    const filters = [
      {
        type: "field_value_toggle_group",
        field: "hang",
        items: [
          {
            value: "B1",
            name: "B1",
          },
          {
            value: "B2",
            name: "B2",
          },
          {
            value: "C",
            name: "C",
          },
          {
            value: "DEF",
            name: "DEF",
          },
          {
            value: "",
            name: "Không phân loại",
          },
        ],
      },
      {
        type: "field_value_selection",
        field: "type",
        name: "Loại đề",
        multiSelect: "or",
        options: [
          {
            value: "1",
            name: "Hết môn",
          },
          {
            value: "0",
            name: "Hết khóa",
          },
        ],
      },
    ];

    const schema = {
      strict: true,
      fields: {
        hang: { type: "string" },
        type: { type: "string" },
      },
    };

    return (
      <EuiSearchBar
        query={query}
        box={{
          placeholder: "Tìm kiếm hạng hoặc tên bộ đề...",
          incremental,
          schema,
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return null;
    }
    return (
      <Fragment>
        <EuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <EuiSpacer size="l" />
      </Fragment>
    );
  };

  const renderTable = () => {
    const columns = [
      {
        name: "Tên ngân hàng",
        field: "name",
      },
      {
        name: "Hạng",
        field: "hang",
      },
      {
        name: "Loại đề",
        field: "type",
        render: (type) => (String(type) === "1" ? "Hết môn" : "Hết khóa"),
      },
    ];

    const queriedItems = EuiSearchBar.Query.execute(query, questionBanks, {
      defaultFields: ["name", "hang", "type"],
    });

    return (
      <EuiBasicTable
        items={queriedItems}
        columns={columns}
        itemId="id"
        selection={{
          onSelectionChange,
          selectable: (item) => true,
        }}
      />
    );
  };

  if (!exam || !exam.question_banks || exam.question_banks.length === 0) {
    return <EuiText>No data available</EuiText>;
  }

  // Cột cho bảng
  const columns = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "name",
      name: "Tên Bộ Đề",
    },
    {
      field: "created_date",
      name: "Ngày Tạo",
    },
    {
      field: "updated_date",
      name: "Ngày Cập Nhật",
    },
  ];

  return (
    <EuiModal onClose={closeModal} maxWidth="1200px">
      <EuiModalHeader>
        <EuiModalHeaderTitle>Thêm bài kiểm tra</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <>
          <EuiPanel>
            <EuiFlexGroup style={{ maxWidth: 600 }}>
              <EuiFlexItem>
                <EuiFormRow label="Ngày bắt đầu - kết thúc">
                  <EuiDatePickerRange
                    startDateControl={
                      <EuiDatePicker
                        selected={editedExam.start_date}
                        dateFormat="DD/MM/YYYY"
                        onChange={(d) => onExamPropChange("start_date", d)}
                        startDate={startDate}
                        endDate={endDate}
                        aria-label="Start date"
                      />
                    }
                    endDateControl={
                      <EuiDatePicker
                        selected={editedExam.end_date}
                        dateFormat="DD/MM/YYYY"
                        onChange={(d) => onExamPropChange("end_date", d)}
                        startDate={startDate}
                        endDate={endDate}
                        aria-label="End date"
                      />
                    }
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{ width: 100 }}>
                <EuiFormRow label="Điểm đạt">
                  <EuiFieldNumber
                    max={10}
                    placeholder={10}
                    value={editedExam.passing_score}
                    onChange={(e) =>
                      onExamPropChange(
                        "passing_score",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFormRow label="Tên bài kiểm tra">
                  <EuiFieldText
                    placeholder="Nhập tên bài kiểm tra... "
                    name="name"
                    value={editedExam.name}
                    onChange={(e) => onExamPropChange("name", e.target.value)}
                  />
                </EuiFormRow>
                <EuiFormRow label="Loại đề">
                  <EuiSuperSelect
                    options={examTypeSelectOptions}
                    valueOfSelected={editedExam.type}
                    onChange={(value) => onExamPropChange("type", value)}
                    itemLayoutAlign="top"
                    hasDividers
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Thời gian">
                  <EuiRange
                    min={0}
                    max={100}
                    value={editedExam.duration}
                    onChange={(e) =>
                      onExamPropChange("duration", parseInt(e.target.value))
                    }
                    showInput
                  />
                </EuiFormRow>
                <EuiFormRow label="Số câu hỏi">
                  <EuiRange
                    min={0}
                    max={100}
                    value={editedExam.num_of_questions}
                    onChange={(e) =>
                      onExamPropChange(
                        "num_of_questions",
                        parseInt(e.target.value)
                      )
                    }
                    showInput
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
          </EuiPanel>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiPanel style={{overflowY: "auto", height:"360px"}}>
                <EuiText>
                  <h4>Bộ đề đã chọn:</h4>
                </EuiText>
                {exam.id !== 0 ? exam.id : "Chưa có bộ đề nào được chọn."}
                <EuiBasicTable
                  items={exam.question_banks} // sử dụng mảng question_banks từ exam
                  columns={columns}
                />
            </EuiPanel>
            <Fragment>
              <EuiPanel>
                <EuiFlexGroup alignItems="center">
                  <EuiFlexItem>{renderSearch()}</EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="l" />
                {renderError() || (
                  <EuiFlexGroup>
                    <div style={{ height: "230px", overflowY: "auto" }}>
                      <EuiFlexItem grow={6}>{renderTable()}</EuiFlexItem>
                    </div>
                  </EuiFlexGroup>
                )}
              </EuiPanel>
            </Fragment>
          </EuiFlexGroup>
        </>
        <EuiSpacer />
      </EuiModalBody>
      <EuiModalFooter>
        <EuiButtonEmpty onClick={closeModal}>Hủy</EuiButtonEmpty>
        <EuiButton onClick={onSave} fill>
          Lưu
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};

export default Modal;
