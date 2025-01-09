import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import { AppProvider } from "./components/AppContext";
import { UIProvider, useUIContext } from "./components/UIContext";
import { EuiGlobalToastList } from "@elastic/eui";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Questions from "./components/Questions";
import Home from "./components/Home";
import QuestionBanks from "./components/QuestionBank/index";
import QuestionBankItems from "./components/QuestionBank/Items";
import Courses from "./components/Course";
import Exam from "./components/Exam";
import "./App.css";
import "./components/modals";
import Reports from "./components/Reports";
import Branches from "./components/Branches";
import Customers from "./components/Customers";
import LmsCourse from "./components/LmsCourse";
import LmsCourseDetail from "./components/LmsCourse/LmsCourseDetail";
import Test from "./components/Test";

function AppContent() {
  const { toasts, removeToast } = useUIContext();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PrivateRoute />}>
            <Route path="*" element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="questions" element={<Questions />} />
            <Route path="courses" element={<Courses />} />
            <Route path="lmscourse" element={<LmsCourse/>}/>
            <Route path="lmscourse/:id" element={<LmsCourseDetail/>}/>
            <Route path="exam/:courseId" element={<Exam />} />
            <Route path="reports" element={<Reports />} />
            <Route path="qb" element={<QuestionBanks />} />
            <Route path="test" element={<Test />} />
            <Route path="qb/:id" element={<QuestionBankItems />} />
            <Route path="branches" element={<Branches />} />
            <Route path="customers" element={<Customers />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </>
  );
}

function App() {
  return (
    <UIProvider>
      <AppProvider>
        <NiceModal.Provider>
          <AppContent />
        </NiceModal.Provider>
      </AppProvider>
    </UIProvider>
  );
}

export default App;
