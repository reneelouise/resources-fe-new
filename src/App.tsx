import Header from "./components/Header";

// import ResourceList from "./components/ResourceList";
import Search from "./components/Search";

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Search />
      {/* <ResourceList /> */}
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
