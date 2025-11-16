// src/main.jsx (DESPUÉS)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Ya no está el "StrictMode"
  <App />
);
