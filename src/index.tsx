import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import StudyListPage from "./components/StudyListPage";
import ResourceListPage from "./components/ResourceListPage";
import NotFound from "./components/NotFound";
import CreateNewResource from "./components/CreateNewResource";
import UserList from "./components/Users/UserList";
import UserPage from "./components/Users/UserPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFound />} />
          <Route path="" element={<Navigate replace to="resources" />} />
          <Route path="resources" element={<ResourceListPage />} />
          <Route path="studylist" element={<StudyListPage />} />
          <Route path="new" element={<CreateNewResource />} />
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
