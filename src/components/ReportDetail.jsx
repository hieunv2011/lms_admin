import React, { useState, useEffect } from 'react';
import {
  EuiBasicTable,
  EuiHealth,
  EuiConfirmModal,
  EuiOverlayMask,
  EuiRadioGroup,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import useApi from '../utils/useApi';

const ReportDetail = ({ trainee, onExamReset }) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedExamToReset, setSelectedExamToReset] = useState(null);
  const [requestReset, setRequestReset] = useState(false);
  const { resetAttempt } = useApi();
  const [keepSettings, setKeepSettings] = useState(null);
  const [showError, setShowError] = useState(false);

  const radioOptions = [
    { id: '1', label: 'Giữ nguyên câu hỏi hiện tại' },
    { id: '0', label: 'Thay đổi câu hỏi' },
  ];

  const showConfirmModal = (exam) => {
    setSelectedExamToReset(exam);
    setIsConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalVisible(false);
    setSelectedExamToReset(null);
  };

  const handleResetConfirm = () => {
    if (keepSettings === null) {
      setShowError(true);
    } else {
      setRequestReset(true);
      setShowError(false);
    }
  };

  useEffect(() => {
    if (selectedExamToReset && requestReset) {
      (async () => {
        const result = await resetAttempt(selectedExamToReset.trainee_exam_id, {
          keep_settings: keepSettings,
        });
        onExamReset({
          ...trainee,
          exams: trainee.exams.map((exam) => (exam.id === selectedExamToReset.id ? result.data : exam)),
        });
        closeConfirmModal();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExamToReset, requestReset]);

  const examColumns = [
    {
      field: 'id',
      name: 'ID',
      width: '5%',
    },
    {
      field: 'name',
      name: 'Tên bài thi',
      width: '35%',
    },
    {
      field: 'score',
      name: 'Điểm số',
      render: (score, exam) => `${score} / ${exam.passing_score}`,
      width: '20%',
      align: 'center',
    },
    {
      field: 'status',
      name: 'Trạng thái',
      render: (status, exam) => (
        <EuiHealth color={exam.score >= exam.passing_score ? 'success' : 'danger'}>
          {exam.score >= exam.passing_score ? 'Đạt' : 'Không đạt'}
        </EuiHealth>
      ),
      width: '20%',
      align: 'center',
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Reset',
          description: 'Reset attempt',
          icon: 'refresh',
          type: 'icon',
          onClick: (exam) => showConfirmModal(exam),
        },
      ],
      width: '20%',
      align: 'right',
    },
  ];

  const exams = trainee.exams.filter((exam) => exam.attempt_id !== null);

  return exams.length > 0 ? (
    <div
      style={{
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: '0',
        fontSize: '14px',
      }}
    >
      <EuiBasicTable
        items={exams}
        columns={examColumns}
        tableLayout="fixed"
        rowProps={() => ({
          style: { height: '40px' },
        })}
      />
      {isConfirmModalVisible && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Hủy kết quả bài thi"
            onCancel={closeConfirmModal}
            onConfirm={handleResetConfirm}
            cancelButtonText="Giữ lại"
            confirmButtonText="Xác nhận hủy"
            buttonColor="danger"
            defaultFocusedButton="cancel"
          >
            <p>Bạn có chắc chắn muốn hủy kết quả bài thi này không? Hành động này không thể hoàn tác.</p>
            <EuiSpacer size="m" />
            <EuiRadioGroup
              options={radioOptions}
              idSelected={keepSettings !== null ? keepSettings.toString() : undefined}
              onChange={(id) => setKeepSettings(parseInt(id, 10))}
              name="keep_settings"
            />
            {showError && (
              <EuiText color="danger" size="s">
                <p>Vui lòng chọn một tùy chọn trước khi xác nhận.</p>
              </EuiText>
            )}
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
    </div>
  ) : null;
};

export default ReportDetail;
