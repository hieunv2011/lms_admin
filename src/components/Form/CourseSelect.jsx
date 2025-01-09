import React, { useState, useEffect } from 'react';
import { EuiFormRow, EuiComboBox } from '@elastic/eui';
import useApi from '../../utils/useApi';

const CourseSelect = ({ onSelectCourse, selectedCourseId }) => {
  const [selectedIds, setSelectedIds] = useState(selectedCourseId > 0 ? [selectedCourseId] : []);
  const [courses, setCourses] = useState([]);

  const { getCourses } = useApi();
  const selectedOptions = structuredClone(courses.filter((course) => selectedIds.includes(course.value)));

  useEffect(() => {
    (async () => {
      const response = await getCourses(true);
      const cs = response.data.items.map((s) => ({ label: s.ten_khoa_hoc, value: s.id }));
      setCourses(cs);
    })();
  }, [getCourses]);

  const onChange = (options) => {
    if (options.length > 0) {
      setSelectedIds([options[0].value]);
      onSelectCourse(options[0].value);
    } else {
      setSelectedIds([]);
      onSelectCourse(0);
    }
  };

  return (
    <EuiFormRow label="Khóa học" display="centerCompressed">
      <EuiComboBox
        aria-label="Lựa chọn khóa học"
        placeholder="Chọn một khóa học"
        singleSelection={{ asPlainText: true }}
        options={courses}
        selectedOptions={selectedOptions}
        onChange={onChange}
        isClearable={true}
      />
    </EuiFormRow>
  );
};

export default CourseSelect;
