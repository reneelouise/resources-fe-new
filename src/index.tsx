import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import StudyList from "./components/StudyList";
import ResourceListPage from "./components/ResourceListPage";
import CreateNewResource from "./components/CreateNewResource";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<ResourceListPage />} />
          <Route path="resources" element={<ResourceListPage />} />
          <Route path="studylist" element={<StudyList />} />
          <Route path="new" element={<CreateNewResource />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
