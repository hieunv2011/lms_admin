import React, { useEffect, useState, Fragment } from "react";
import useApi from "../../utils/useApi";
import { useParams } from "react-router-dom";
import {
  EuiBasicTable,
  EuiPanel,
  EuiText,
  EuiEmptyPrompt,
  EuiButton,
  EuiSpacer,
  EuiLink,
  EuiButtonIcon,
} from "@elastic/eui";
import KibanaLayout from "../../layouts/kibana";
import moment from "moment";
import Modal from "./Modal";

const Index = () => {
  const { getCourseExams, deleteCourseExam } = useApi();
  const { courseId } = useParams();
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [error, setError] = useState(null); // Input
  // Modal
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const fetchExams = async () => {
    try {
      const response = await getCourseExams(courseId);
      setExams(response.data.items);
      console.log(response.data.items);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingExams(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [courseId, getCourseExams]);

  const handleDeleteExam = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài kiểm tra này?")) {
      try {
        await deleteCourseExam(id); // Gọi API xóa bài kiểm tra
        setExams((prevExams) => prevExams.filter((exam) => exam.id !== id)); // Cập nhật danh sách bài kiểm tra
      } catch (err) {
        setError(err); // Nếu có lỗi, cập nhật lỗi
      }
    }
  };

  const examColumns = [
    {
      field: "name",
      name: "Tên bài kiểm tra",
      render: (name, item) => (
        <EuiLink
          onClick={() => {
            setSelectedExam(item);
            setIsModalVisible(true);
          }}
        >
          {name}
        </EuiLink>
      ),
    },
    {
      field: "start_date",
      name: "Bắt đầu",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      field: "end_date",
      name: "Kết thúc",
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      field: "type",
      name: "Loại đề",
      render: (t) => (t === 1 ? "Đề ngẫu nhiên" : "Đề cố định"),
    },
    {
      field: "num_of_questions",
      name: "Số câu",
    },
    {
      field: "passing_score",
      name: "Điểm đạt",
    },
    {
      field: "duration",
      name: "Thời gian",
    },
    {
      field: "action",
      name: "Hành động",
      render: (item) => (
        <EuiButtonIcon
          iconType="trash"
          onClick={() => handleDeleteExam(item.id)}
          display="base"
          color="danger"
        >
          Thực hiện
        </EuiButtonIcon>
      ),
    },
  ];

  if (loadingExams) {
    return (
      <EuiPanel>
        <EuiText size="s">Loading bài kiểm tra...</EuiText>
      </EuiPanel>
    );
  }

  if (error) {
    return (
      <EuiEmptyPrompt
        title={<h2>Có lỗi xảy ra</h2>}
        body={<p>{error.message}</p>}
      />
    );
  }

  const examDefault = {
    id: 0,
    course_id: courseId,
    name: "",
    type: 0,
    start_date: moment(),
    end_date: moment(),
    num_of_questions: 10,
    passing_score: 7,
    duration: 30,
  };

  const renderModal = () => {
    if (!isModalVisible) {
      return null;
    }
    const examToEdit = selectedExam ? selectedExam : examDefault;
    return <Modal closeModal={closeModal} exam={examToEdit} fetchExams={fetchExams} />;
  };

  return (
      <>
        <EuiPanel>
          <EuiText textAlign="center" size="xl" style={{ fontWeight: "bold" }}>
            DANH SÁCH BÀI KIỂM TRA KHOÁ
            {exams.length > 0 ? exams[0].course_id : "N/A"}
          </EuiText>
          {/* Thêm bài kiểm tra */}
          <EuiButton
            onClick={() => {
              setSelectedExam(null); // Đảm bảo không chọn bài kiểm tra nào
              setIsModalVisible(true); // Mở modal
            }}
            color="primary"
          >
            Thêm bài kiểm tra
          </EuiButton>
          {exams.length > 0 ? (
            <EuiBasicTable
              tableCaption="Danh sách bài kiểm tra"
              items={exams}
              itemId="id"
              columns={examColumns}
            />
          ) : (
            <EuiEmptyPrompt
              title={<h2>Không có bài kiểm tra nào.</h2>}
              body={<p>Vui lòng kiểm tra lại.</p>}
            />
          )}
        </EuiPanel>
        <EuiSpacer />
        {renderModal()}
      </>
  );
};

export default Index;
