import Login from "@pages/Login";
import { FC, ReactElement, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// styles
import { ThemeProvider } from "styled-components";
import ThemeStyles from "@styles/theme";
import "@styles/index.scss";
import { useTheme } from "@contexts/themeContext";
import AppBar from "@layout/AppBar";
import { useWindowSize } from "react-use";
import SideBar from "@layout/sidebar/SideBar";
import Home from "@pages/Home";
import ProtectedRoute from "@pages/ProtectedRoute";
import SavingPlanView from "@pages/SavingPlanView";
import SignUp from "@pages/SignUp";
import UserInfo from "@pages/UserInfo";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { IReduxState } from "@interfaces/store.interface";
import Checkout from "@pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSavingView from "@pages/UserSavingView";
import AllUserSavings from "@pages/AllUserSavings";
import PageNotFound from "@components/PageNotFound";
import AdminCreateSavingPlan from "@pages/adminPages/AdminCreateSavingPlan";
import "react-datepicker/dist/react-datepicker.css";

import AdminDashboard from "@pages/adminPages/AdminDashBoard";
import { setNavigateFunction, setDispatchFunction } from "@services/axios";
import AdminViewUser from "@pages/adminPages/AdminViewUser";

const adminRoutes = [
  {
    path: "/admin/create-saving-plan",
    Element: <AdminCreateSavingPlan />,
  },
  {
    path: "/admin",
    Element: <AdminDashboard />,
  },
  {
    path: "/admin/dashboard",
    Element: <AdminCreateSavingPlan />,
  },
  {
    path: "/admin/view/user/:userId",
    Element: <AdminViewUser />,
  },
];

const App: FC = (): ReactElement => {
  const { width } = useWindowSize();
  const withHeader = useAppSelector((state: IReduxState) => state.header);
  const { theme } = useTheme();

  // for logout out of the function
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setNavigateFunction(navigate);
    setDispatchFunction(dispatch);
  }, [navigate, dispatch]);
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
              {adminRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ProtectedRoute>{route.Element}</ProtectedRoute>}
                />
              ))}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
