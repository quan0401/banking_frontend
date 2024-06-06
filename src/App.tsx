import Login from "@pages/Login";
import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

// styles
import { ThemeProvider } from "styled-components";
import ThemeStyles from "@styles/theme";
import "@styles/index.scss";
import { useTheme } from "@contexts/themeContext";
import AppBar from "@layout/AppBar";
import { useLocation, useWindowSize } from "react-use";
import SideBar from "@layout/sidebar/SideBar";
import { useSidebar } from "@contexts/sidebarContext";
import Home from "@pages/Home";
import ProtectedRoute from "@pages/ProtectedRoute";
import SavingPlanView from "@pages/SavingPlanView";
import SignUp from "@pages/SignUp";

const App: FC = (): ReactElement => {
  const { width } = useWindowSize();

  const { theme } = useTheme();
  const { setOpen } = useSidebar();
  const path = useLocation().pathname;
  const withSidebar = path !== "/login" && path !== "/signup";

  return (
    <ThemeProvider theme={{ theme: theme }}>
      <ThemeStyles />
      {width < 1280 && withSidebar && <AppBar />}
      <div className={`app ${!withSidebar ? "fluid" : ""}`}>
        {withSidebar && <SideBar />}
        <div className="app_content">
          {width >= 1280 && withSidebar && <AppBar />}
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
                path="/savingPlan-view/:planId"
                element={
                  <ProtectedRoute>
                    <SavingPlanView />
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
