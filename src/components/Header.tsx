import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IUser } from "../utils/interfaces";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Header = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string>();
  const [showLogInForm, setShowLogInForm] = useState<boolean>(false);

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchUsers = async () => {
    try {
      // console.log('fetchUsers is running')
      const res = await axios.get(`${baseUrl}/users`);
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log('useEffect is firing')
    fetchUsers();
  }, []);

  const handleLogout = () => {
    setShowLogInForm(false);
    setLoggedInUser("");
  };

  const handleLogin = () => {
    setLoggedInUser(
      (document.getElementById("users") as HTMLInputElement).value
    );
    setShowLogInForm(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Resources
              </Button>
            </Stack>

            <Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                BiblioTech
              </Typography>
            </Box>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div id="header">
        <nav id="container">
          <p>Resources</p>
          {/* <Link to="/resources">Resources</Link>
                    <Link to="/studylist">Study List</Link> */}
          <h1>Bibliotech</h1>
          {!showLogInForm && !loggedInUser && (
            <button id="login-btn" onClick={() => setShowLogInForm(true)}>
              Login
            </button>
          )}
          {showLogInForm && !loggedInUser && (
            <div>
              <select id="users">
                <option value="" selected disabled hidden>
                  Select a user to login
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <button id="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button id="cancel-btn" onClick={() => setShowLogInForm(false)}>
                Cancel
              </button>
            </div>
          )}
          {loggedInUser && (
            <>
              <p>You are logged in as user {loggedInUser}</p>
              <button id="logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
