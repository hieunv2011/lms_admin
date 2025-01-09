import React, { useState } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiFieldSearch, EuiButton, EuiFormRow } from '@elastic/eui';

import Subjects from './SubjectSelect';
import Chapters from './ChapterSelect';

const ContentFilters = ({ onRequestSearch, q, subjectId, chapterId }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjectId || 0);
  const [selectedChapterId, setSelectedChapterId] = useState(chapterId || 0);
  const [searchInputValue, setSearchInputValue] = useState(q || '');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilterUpdated();
    }
  };

  const handleFilterUpdated = (params) => {
    params = params || {};
    onRequestSearch({ q: searchInputValue, subjectId: selectedSubjectId, chapterId: selectedChapterId, ...params });
  };

  const handleSelectSubject = (subject_id) => {
    setSelectedSubjectId(subject_id);
    handleFilterUpdated({ subjectId: subject_id });
  };

  const handleSelectChapter = (chapter_id) => {
    setSelectedChapterId(chapter_id);
    handleFilterUpdated({ chapterId: chapter_id });
  };

  return (
    <EuiFlexGroup responsive={true} gutterSize="m" direction="row" wrap>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <Subjects onSelectSubject={handleSelectSubject} selectedSubjectId={selectedSubjectId} />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <Chapters
          subjectId={selectedSubjectId}
          onSelectChapter={handleSelectChapter}
          selectedChapterId={selectedChapterId}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
        <EuiFormRow label="Từ khóa" display="centerCompressed">
          <EuiFieldSearch
            placeholder="Từ khóa"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            aria-label="Search questions"
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

export default ContentFilters;
