import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import StudyList from "./components/StudyList";
import ResourceList from "./components/ResourceList";
import CreateNewResource from "./components/CreateNewResource";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="resources" element={<ResourceList />} />
          <Route
            path="studylist"
            element={
              localStorage.getItem("loggedInUser") ? (
                <StudyList />
              ) : (
                "You are not logged in"
              )
            }
          />
          <Route path="new" element={<CreateNewResource />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
