import React, { useState, useEffect } from 'react';
import { EuiSelect, useGeneratedHtmlId, EuiFormRow } from '@elastic/eui';
import useApi from '../../utils/useApi';

const defaultChapterOption = { text: '-- Chọn chương --', value: 0, style: { color: '#f00' } };

const ChapterSelect = ({ subjectId, onSelectChapter, selectedChapterId }) => {
  const [selectedChapter, setSelectedChapter] = useState(selectedChapterId || 0);
  const [chapters, setChapters] = useState([defaultChapterOption]);
  const basicSelectId = useGeneratedHtmlId({ prefix: 'selectChapter' });

  const { getSubjectChapters } = useApi();

  useEffect(() => {
    (async (subjectId) => {
      let response = { data: [] };
      if (subjectId > 0) {
        response = await getSubjectChapters(subjectId);
      }
      const chapterOptions = response.data.map((chap) => ({ text: chap.name, value: chap.id }));
      chapterOptions.unshift(defaultChapterOption);
      setChapters(chapterOptions);
    })(subjectId);
  }, [subjectId]);

  const onChange = (e) => {
    setSelectedChapter(e.target.value);
    onSelectChapter(e.target.value);
  };

  return (
    <EuiFormRow label="Chương" display="centerCompressed">
      <EuiSelect
        id={basicSelectId}
        options={chapters}
        value={selectedChapter}
        onChange={(e) => onChange(e)}
        aria-label="Chương"
        disabled={subjectId <= 0}
      />
    </EuiFormRow>
  );
};

export default ChapterSelect;
