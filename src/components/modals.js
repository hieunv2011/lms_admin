import NiceModal from '@ebay/nice-modal-react';
import EditQuestionBank from './QuestionBank/Edit'
import SelectQuestions from './QuestionBank/Questions';
import EditExam from './Course/Edit';

NiceModal.register('edit-question-bank', EditQuestionBank);
NiceModal.register('select-questions', SelectQuestions);
NiceModal.register('edit-course-exam', EditExam);
