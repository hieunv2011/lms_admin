import React,{useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { EuiHideFor, EuiPageTemplate } from "@elastic/eui";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";

const PrivateRoute = () => {
  const toggleSide = () => setShowSide(!showSide);
  const [showSide, setShowSide] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const { isAuthenticated, loading } = useAppContext();
  if (loading) {
    return null;
  }
  return isAuthenticated ? (
    <>
      <EuiPageTemplate paddingSize="none" panelled>
        {showSide && (
          <EuiPageTemplate.Sidebar className="">
            <Sidebar
              navIsOpen={showSide}
              toggleSide={setShowSide}
              onItemClick={(item) => console.log(item)}
            />
          </EuiPageTemplate.Sidebar>
        )}
        <EuiPageTemplate.Header bottomBorder={false}>
          <Header
            toggleSide={toggleSide}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </EuiPageTemplate.Header>
        <EuiPageTemplate.Section paddingSize="l" restrictWidth="false">
          <Outlet />
        </EuiPageTemplate.Section>
        <EuiPageTemplate.BottomBar className="text-white flex space-x-4 h-10">
          <EuiHideFor sizes={["xs", "s"]}>
            <Footer />
          </EuiHideFor>
        </EuiPageTemplate.BottomBar>
      </EuiPageTemplate>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
