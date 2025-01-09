import React, { useState, useEffect } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiFieldSearch, EuiButton, EuiFormRow, useGeneratedHtmlId, EuiSelect } from '@elastic/eui';
import { getCachedSubjects, getCachedChapters, setCachedSubjects, setCachedChapters } from '../../utils/cache';
import useApi from '../../utils/useApi';

const QuestionFilter = ({onSearch}) => {
  const [filters, setFilters] = useState({subject_id: 0, chapter_id: 0, q: ""});
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const { getSubjects, getSubjectChapters } = useApi();

  const onChange = (props, value) => {
    setFilters({...filters, [props]: value});
  }

  const doSearch = () => {
    onSearch(filters);
  }

  useEffect(() => {
    const loadChapter = async () => {      
      if (filters.subject_id > 0) {
        const cachedChapters = getCachedChapters(filters.subject_id);
        if (cachedChapters.loaded) {
          setChapters(cachedChapters.data);
        } else {
          const response = await getSubjectChapters(filters.subject_id);
          const chapterOptions = response.data.map((chap) => ({ text: chap.name, value: chap.id }));  
          chapterOptions.unshift({ text: '-- Chọn chương --', value: 0, style: { color: '#f00' } });
          setChapters(chapterOptions);
          setCachedChapters(filters.subject_id, chapterOptions);
        }
      } else {
        setChapters([{ text: '-- Chọn chương --', value: 0, style: { color: '#f00' } }])  
      }
    }
    loadChapter();
  }, [filters.subject_id])

  useEffect(() => {
    const loadSubjects = async () => {
      const cachedSubjects = getCachedSubjects();
      if (cachedSubjects.loaded) {
        setSubjects(cachedSubjects.data);
      } else {
        const response = await getSubjects();
        const subjectOptions = response.data.map((s) => ({ text: s.name, value: s.id }));
        subjectOptions.unshift({ text: '-- Chọn môn học --', value: 0 });
        setCachedSubjects(subjectOptions);
        setSubjects(subjectOptions);
      }
    }
    loadSubjects();
  }, []);

  return (
    <EuiFlexGroup responsive={true} gutterSize="m">
      <EuiFlexItem grow={false}>
        <EuiFormRow label="Môn học" display="centerCompressed">
          <EuiSelect
            id={useGeneratedHtmlId({ prefix: 'subject' })}
            options={subjects}
            value={filters.subject_id}
            onChange={(e) => onChange("subject_id", parseInt(e.target.value))}
            aria-label="Môn học"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow label="Chương" display="centerCompressed">
            <EuiSelect
              id={useGeneratedHtmlId({ prefix: 'chapter' })}
              options={chapters}
              value={filters.chapter_id}
              onChange={(e) => onChange("chapter_id", parseInt(e.target.value))}
              aria-label="Chương"
              disabled={chapters.length == 1}
            />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow label="Từ khóa" display="centerCompressed">
          <EuiFieldSearch
            placeholder="Từ khóa"
            value={filters.q}
            onChange={(e) => onChange("q", e.target.value)}
            onKeyDown={() => {}}
            aria-label="Search questions"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow display="centerCompressed" hasEmptyLabelSpace>
          <EuiButton onClick={doSearch}>Tìm</EuiButton>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default QuestionFilter;
