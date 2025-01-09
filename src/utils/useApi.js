import axios from 'axios';
import SERVER_URL from '../config';
import { getToken, getData } from './storage';
import eventBus from './eventbus';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setupInterceptors = () => {
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      eventBus.emit('api-loading', true);
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      const selectedCustomer = getData('selectedCustomer');
      if (selectedCustomer) {
        config.params = { ...config.params, customer_id: selectedCustomer.id };
      }
      const selectedBranch = getData('selectedBranch');
      if (selectedBranch) {
        config.params = { ...config.params, branch_id: selectedBranch.id };
      }
      return config;
    },
    (error) => {
      eventBus.emit('api-loading', false);
      return Promise.reject(error);
    }
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => {
      eventBus.emit('api-loading', false);
      return response;
    },
    (error) => {
      eventBus.emit('api-loading', false);
      if (error.response) {
        eventBus.emit('api-error', error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

  return { requestInterceptor, responseInterceptor };
};

setupInterceptors();

const loginByUserIdPwd = (user_id, password) => {
  return axiosInstance.post('/admin/login', { user_id, password });
};

const getSubjects = () => {
  return axiosInstance.get('/subjects');
};

const getSubjectChapters = (subject_id) => {
  return axiosInstance.get(`/subjects/${subject_id}/chapters`, { params: { subject_id } });
};

const getQuestions = ({ subject_id, chapter_id, bank_id, page, q }) => {
  return axiosInstance.get('/admin/questions', {
    params: { subject_id, chapter_id, bank_id, q, page },
  });
};

const getQuestionBanks = (q) => {
  return axiosInstance.get('/admin/question-banks', { params: { q } });
};

const getQuestionBank = (id) => {
  return axiosInstance.get(`/admin/question-banks/${id}`);
};

const updateQuestionBank = (id, name, type, note, hang) => {
  return axiosInstance.put(`/admin/question-banks/${id}`, { name, type, note, hang });
};

const createQuestionBank = (name, type, note, hang) => {
  return axiosInstance.post(`/admin/question-banks`, { name, type, note, hang });
};

const deleteQuestionBank = (id) => {
  return axiosInstance.delete(`/admin/question-banks/${id}`);
};

const getQuestionBankItems = (id) => {
  return axiosInstance.get(`/admin/question-banks/${id}/items`);
};

const addQuestionBankItems = (id, items) => {
  return axiosInstance.post(`/admin/question-banks/${id}/items`, { items });
};

const removeQuestionBankItems = (bank_id, question_id) => {
  return axiosInstance.delete(`/admin/question-banks/${bank_id}/items/${question_id}`);
};

const getCourses = (minimal = false) => {
  return axiosInstance.get(`/admin/courses`, { params: { minimal } });
};

const getCourseExams = (id) => {
  return axiosInstance.get(`/admin/courses/${id}/exams`);
};

//Lms Course
const getLmsExams = () =>{
  return axiosInstance.get(`/admin/lms/courses`);
};
const getLmsExamsDetail = (id) =>{
  return axiosInstance.get(`/admin/lms/courses/${id}`);
};

const createCourseExam = (data) => {
  return axiosInstance.post(`/admin/exams`, { ...data });
};

const updateCourseExam = (id, data) => {
  return axiosInstance.put(`/admin/exams/${id}`, { ...data });
};

const deleteCourseExam = (id) => {
  return axiosInstance.delete(`/admin/exams/${id}`);
};

const getCourseExamQuestionBanks = (id) => {
  return axiosInstance.get(`/admin/exams/${id}/question-banks`);
};

const updateCourseExamQuestionBanks = (id, items) => {
  return axiosInstance.post(`/admin/exams/${id}/question-banks`, { items });
};

const getTrainees = ({ courseId, page }) => {
  return axiosInstance.get('/admin/trainees', { params: { course_id: courseId, page } });
};

const resetAttempt = (trainee_exam_id, data) => {
  return axiosInstance.post(`/admin/trainees-exams/${trainee_exam_id}/reset-attempts`, { ...data });
};

const getBranches = (customerId, page) => {
  return axiosInstance.get('/admin/branches', { params: { customer_id: customerId, page } });
};

const getCustomers = () => {
  return axiosInstance.get('/admin/customers');
};

const api = {
  loginByUserIdPwd,
  getSubjects,
  getSubjectChapters,
  getQuestions,
  //getLms
  getLmsExams,
  getLmsExamsDetail,
  getCourses,
  getQuestionBanks,
  getQuestionBank,
  updateQuestionBank,
  createQuestionBank,
  deleteQuestionBank,
  getQuestionBankItems,
  addQuestionBankItems,
  removeQuestionBankItems,
  getCourseExams,
  createCourseExam,
  updateCourseExam,
  updateCourseExamQuestionBanks,
  getCourseExamQuestionBanks,
  deleteCourseExam,
  getTrainees,
  resetAttempt,
  getBranches,
  getCustomers,
};

const useApi = () => {
  return api;
};

export default useApi;
