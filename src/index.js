import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ThemeContext from "./Context/ThemeContext.js";
import { BrowserRouter as Router } from "react-router-dom";

TimeAgo.addDefaultLocale(en);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ThemeContext>
      <App />
    </ThemeContext>
  </Router>
);
