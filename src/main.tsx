import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "@contexts/themeContext.tsx";
import { SidebarProvider } from "@contexts/sidebarContext.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SidebarProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </SidebarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
