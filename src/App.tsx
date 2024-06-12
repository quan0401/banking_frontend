import Login from "@pages/Login";
import { FC, ReactElement, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// styles
import { ThemeProvider } from "styled-components";
import ThemeStyles from "@styles/theme";
import "@styles/index.scss";
import { useTheme } from "@contexts/themeContext";
import AppBar from "@layout/AppBar";
import { useWindowSize } from "react-use";
import SideBar from "@layout/sidebar/SideBar";
import { useSidebar } from "@contexts/sidebarContext";
import Home from "@pages/Home";
import ProtectedRoute from "@pages/ProtectedRoute";
import SavingPlanView from "@pages/SavingPlanView";
import SignUp from "@pages/SignUp";
import UserInfo from "@pages/UserInfo";
import { useAppSelector } from "@redux/store";
import { IReduxState } from "@interfaces/store.interface";
import Checkout from "@pages/Checkout";
import { ToastContainer } from "react-toastify";
import { showSuccessToast } from "@utils/utils.service";
import "react-toastify/dist/ReactToastify.css";
import UserSavingView from "@pages/UserSavingView";
import AllUserSavings from "@pages/AllUserSavings";

const App: FC = (): ReactElement => {
  const { width } = useWindowSize();
  const withHeader = useAppSelector((state: IReduxState) => state.header);

  const { theme } = useTheme();
  const { setOpen } = useSidebar();

  return (
    <ThemeProvider theme={{ theme: theme }}>
      <ThemeStyles />
      <ToastContainer className={" text-gray-500"} />

      {width < 1280 && withHeader && <AppBar />}
      <div className={`app ${!withHeader ? "fluid" : ""}`}>
        {withHeader && <SideBar />}
        <div className="app_content">
          {width >= 1280 && withHeader && <AppBar />}
          <div className="main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/savingPlan-view/:planId"
                element={
                  <ProtectedRoute>
                    <SavingPlanView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout/:planId"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userSaving/:savingPlanId"
                element={
                  <ProtectedRoute>
                    <UserSavingView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userSaving/all/view"
                element={
                  <ProtectedRoute>
                    <AllUserSavings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
