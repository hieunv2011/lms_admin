import React, { useState, useEffect } from 'react';
import { EuiSelect, EuiFormRow, useGeneratedHtmlId } from '@elastic/eui';
import useApi from '../../utils/useApi';

const defaultSubjectOption = { text: '-- Chọn môn học --', value: 0 };

const SubjectSelect = ({ onSelectSubject, selectedSubjectId }) => {
  const [selectedSubject, setSelectedSubject] = useState(selectedSubjectId || 0);
  const [subjects, setSubjects] = useState([defaultSubjectOption]);
  const basicSelectId = useGeneratedHtmlId({ prefix: 'selectSubject' });

  const { getSubjects } = useApi();

  useEffect(() => {
    (async () => {
      const response = await getSubjects();
      let subjectOptions = response.data.map((s) => ({ text: s.name, value: s.id }));
      subjectOptions.unshift(defaultSubjectOption);
      setSubjects(subjectOptions);
    })();
  }, []);

  const onChange = (e) => {
    const subjectId = parseInt(e.target.value);
    setSelectedSubject(subjectId);
    onSelectSubject(subjectId);
  };

  return (
    <EuiFormRow label="Môn học" display="centerCompressed">
      <EuiSelect
        id={basicSelectId}
        options={subjects}
        value={selectedSubject}
        onChange={(e) => onChange(e)}
        aria-label="Môn học"
      />
    </EuiFormRow>
  );
};

export default SubjectSelect;
