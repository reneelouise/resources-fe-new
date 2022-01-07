import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PopularResources from "./components/PopularResources";
import ResourceList from "./components/ResourceList";
import Search from "./components/Search";
import StudyList from "./components/StudyList";

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Search />
      <ResourceList />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/resources" element={
            <>
              <Header />
              <Search />
              <ResourceList />
            </>
          } />

          <Route path="/studylist" element={
            <>
              <Header />
              <StudyList />
            </>
          } />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}
