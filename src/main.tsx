import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "@contexts/themeContext.tsx";
import { SidebarProvider } from "@contexts/sidebarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
