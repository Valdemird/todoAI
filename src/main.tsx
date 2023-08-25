import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { Router } from "./Router";
import { lightTheme } from "./themes";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
        <Router />
    </ThemeProvider>
  </React.StrictMode>
);
