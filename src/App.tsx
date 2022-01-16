import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./styles/App.css";
import UserContextWrapper from "./components/UserContextWrapper";

export default function App(): JSX.Element {
  return (
    <UserContextWrapper>
      <Header />
      <Outlet />
    </UserContextWrapper>
  );
}
