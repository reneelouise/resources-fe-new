import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import StudyListPage from "./components/StudyListPage";
import ResourceListPage from "./components/ResourceListPage";
import CreateNewResource from "./components/CreateNewResource";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Navigate replace to="resources" />} />
          <Route path="resources" element={<ResourceListPage />} />
          <Route path="studylist" element={<StudyListPage />} />
          <Route path="new" element={<CreateNewResource />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
