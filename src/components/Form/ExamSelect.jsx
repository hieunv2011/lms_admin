import React, { useState, useEffect } from 'react';
import { EuiSelect, useGeneratedHtmlId, EuiFormRow } from '@elastic/eui';
import useApi from '../../utils/useApi';

const defaultExamOption = { text: '-- Chọn bài thi --', value: 0, css: { color: '#f00' } };

const ExamSelect = ({ courseId, onSelectExam, selectedExamId }) => {
  const [selectedExam, setSelectedExam] = useState(selectedExamId || 0);
  const [exams, setExams] = useState([defaultExamOption]);
  const basicSelectId = useGeneratedHtmlId({ prefix: 'selectExam' });

  const { getCourseExams } = useApi();

  useEffect(() => {
    (async (courseId) => {
      let response = { data: { items: [] } };
      if (courseId > 0) {
        response = await getCourseExams(courseId);
      }
      const examOptions = response.data.items.map((exam) => ({ text: exam.name, value: exam.id }));
      examOptions.unshift(defaultExamOption);
      setExams(examOptions);
    })(courseId);
  }, [courseId, getCourseExams]);

  const onChange = (e) => {
    setSelectedExam(e.target.value);
    onSelectExam(e.target.value);
  };

  return (
    <EuiFormRow label="Bài thi" display="centerCompressed">
      <EuiSelect
        id={basicSelectId}
        options={exams}
        value={selectedExam}
        onChange={(e) => onChange(e)}
        aria-label="Bài thi"
        disabled={courseId <= 0}
      />
    </EuiFormRow>
  );
};

export default ExamSelect;
