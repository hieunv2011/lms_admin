import React, { useState } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiFieldSearch, EuiButton, EuiFormRow } from '@elastic/eui';

import CourseSelect from './CourseSelect';
import ExamSelect from './ExamSelect';

const ExamCourseFilters = ({ onRequestSearch, q, courseId, examId }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(courseId || 0);
  const [selectedExamId, setSelectedExamId] = useState(examId || 0);
  const [searchInputValue, setSearchInputValue] = useState(q || '');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterUpdated();
    }
  };

  const handleFilterUpdated = (params) => {
    params = params || {};
    onRequestSearch({ q: searchInputValue, courseId: selectedCourseId, examId: selectedExamId, ...params });
  };

  const handleSelectCourse = (course_id) => {
    setSelectedCourseId(course_id);
    handleFilterUpdated({ courseId: course_id });
  };

  const handleSelectExam = (exam_id) => {
    setSelectedExamId(exam_id);
    handleFilterUpdated({ examId: exam_id });
  };

  return (
    <EuiFlexGroup responsive={true} gutterSize="m" direction="row" wrap>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <CourseSelect onSelectCourse={handleSelectCourse} selectedCourseId={selectedCourseId} />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <ExamSelect courseId={selectedCourseId} onSelectExam={handleSelectExam} selectedExamId={selectedExamId} />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <EuiFormRow label="Từ khóa" display="centerCompressed">
          <EuiFieldSearch
            placeholder="Từ khóa"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            aria-label="Từ khóa"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow display="centerCompressed" hasEmptyLabelSpace>
          <EuiButton onClick={handleFilterUpdated}>Search</EuiButton>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ExamCourseFilters;
