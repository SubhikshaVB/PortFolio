import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";

import { InkProvider } from "./context/InkContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <InkProvider>

      <App />

    </InkProvider>

  </React.StrictMode>

);