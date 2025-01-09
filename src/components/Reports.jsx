import React, { useState, useEffect } from 'react';
import {
  EuiBasicTable,
  EuiPagination,
  EuiButtonIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
} from '@elastic/eui';
import KibanaLayout from '../layouts/kibana';
import useApi from '../utils/useApi';
import CourseSelect from './Form/CourseSelect';
import ReportDetail from './ReportDetail';
import useMySearchParams from '../utils/useMySearchParams';

const hasTakenAnyExam = (trainee) => {
  return trainee.exams.filter((e) => e.attempt_id !== null).length > 0;
};

const defaultColumns = [
  {
    field: 'id',
    name: 'ID',
    valign: 'top',
    width: '150px', // Increased width to accommodate 7-character integers
  },
  {
    field: 'ho_va_ten',
    name: 'Họ tên',
    valign: 'top',
    width: '350px',
  },
];

const Reports = () => {
  const [data, setData] = useState([]);
  const [exams, setExams] = useState([]);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});
  const [pageCount, setPageCount] = useState(1);

  const { page, courseId, setQueryParams } = useMySearchParams({ page: 1, courseId: 0 });

  const { getTrainees, getCourseExams } = useApi();

  const onExamReset = (trainee) => {
    const newData = data.map((item) => (item.id === trainee.id ? trainee : item));
    setData(newData);
    toggleDetails(trainee);
  };

  useEffect(() => {
    (async () => {
      let traineesResult = { data: { items: [], total: 0, size: 1 } };
      let examsResult = { data: { items: [], total: 0, size: 1 } };
      if (courseId > 0) {
        [traineesResult, examsResult] = await Promise.all([getTrainees({ courseId, page }), getCourseExams(courseId)]);
      }
      setData(traineesResult.data.items);
      const p = Math.ceil(traineesResult.data.total / traineesResult.data.size);
      if (p <= 1) {
        setPageCount(1);
      } else {
        setPageCount(p);
      }
      setExams(examsResult.data.items);
    })();
  }, [page, courseId, getTrainees, getCourseExams]);

  const toggleDetails = (item) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.id] && !hasTakenAnyExam(item)) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      itemIdToExpandedRowMapValues[item.id] = <ReportDetail trainee={item} onExamReset={onExamReset} />;
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const actionsColumn = {
    align: 'right',
    width: '40px',
    isExpander: true,
    render: (item) =>
      hasTakenAnyExam(item) ? (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
          iconType={itemIdToExpandedRowMap[item.id] ? 'arrowDown' : 'arrowRight'}
        />
      ) : (
        ''
      ),
  };

  const examColumns = exams.map((exam) => {
    return {
      name: exam.name,
      align: 'left',
      render: (trainee) => {
        const traineeExam = trainee.exams.find((e) => e.id === exam.id);
        if (!traineeExam || traineeExam.attempt_id === null) {
          return '-';
        }

        const isPassed = traineeExam.score >= exam.passing_score;
        const statusIcon = isPassed ? (
          <EuiIcon type="checkInCircleFilled" color="success" />
        ) : (
          <EuiIcon type="crossInACircleFilled" color="danger" />
        );

        return (
          <EuiFlexGroup alignItems="center" gutterSize="s">
            <EuiFlexItem grow={false}>{statusIcon}</EuiFlexItem>
            <EuiFlexItem>
              {traineeExam.score} / {exam.passing_score}
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      },
      width: '150px',
    };
  });

  const columns = [...defaultColumns, ...examColumns, actionsColumn];

  return (
    <>
      <EuiFlexGroup responsive={true} gutterSize="m" direction="row" wrap>
        <EuiFlexItem grow={false} style={{ minWidth: '200px' }}>
          <CourseSelect
            onSelectCourse={(courseId) => setQueryParams({ courseId, page: 1 })}
            selectedCourseId={courseId}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiBasicTable
        tableCaption="Danh sách học viên"
        items={data}
        itemId="id"
        columns={columns}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        tableLayout="auto"
      />

      <EuiSpacer size="l" />
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={pageCount}
            activePage={page - 1}
            onPageClick={(p) => {
              setQueryParams({ courseId, page: p + 1 });
            }}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default Reports;
