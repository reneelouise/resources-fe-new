import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IUser } from "../utils/interfaces";

import {
  AppBar,
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material/";

export default function Header(): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [showLogInForm, setShowLogInForm] = useState<boolean>(false);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        setUsers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setSelectedUser("");
    setShowLogInForm(false);
  };

  const handleLogin = () => {
    localStorage.setItem("loggedInUser", selectedUser);
    setShowLogInForm(false);
  };

  const handleSelectChange = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleCancel = () => {
    setSelectedUser("");
    setShowLogInForm(false);
  };

  const getUserNameFromId = (userId: number) => {
    for (const user of users) {
      if (user.id === userId) {
        return user.name;
      }
    }
  };

  const userIdInLocalStorage = localStorage.getItem("loggedInUser");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            className="NavLinks"
            sx={{ flexGrow: 1, display: { xs: "flex" } }}
          >
            <Link to="resources" style={{ textDecoration: "none" }}>
              <Button
                className="links"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Resources
              </Button>
            </Link>
            {userIdInLocalStorage && (
              <>
                <Link to="studylist" style={{ textDecoration: "none" }}>
                  <Button
                    className="links"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Study List
                  </Button>
                </Link>
                <Link to="new" style={{ textDecoration: "none" }}>
                  <Button
                    className="links"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Create New Resource
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            📚 BiblioTech
          </Typography>
          {!showLogInForm && !userIdInLocalStorage && (
            <Paper sx={{ display: { xs: "flex" } }}>
              <Button
                className="Login-Button"
                variant="outlined"
                color="primary"
                onClick={() => setShowLogInForm(true)}
              >
                Login
              </Button>
            </Paper>
          )}
          {showLogInForm && !userIdInLocalStorage && (
            <Box
              sx={{
                minWidth: "300px",
                display: { xs: "flex" },
              }}
            >
              <Paper sx={{ px: 1.5, py: 0.5 }}>
                <FormControl className="Login-Form" variant="outlined">
                  <Stack direction="row" spacing={2}>
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        minWidth: "200px",
                        fontSize: "8px",
                      }}
                    >
                      <Select
                        className="User-Dropdown-Menu"
                        displayEmpty
                        sx={{ width: 200, height: "2.5rem" }}
                        value={selectedUser}
                        onChange={(e) => handleSelectChange(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>Select a user</em>
                        </MenuItem>
                        {users.map((user) => (
                          <MenuItem
                            className="Users-In-Dropdown"
                            key={user.id}
                            value={user.id}
                          >
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <Button
                      className="user-selected-login-btn"
                      color="primary"
                      variant="contained"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                    <Button
                      className="cancel-btn"
                      color="error"
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </FormControl>
              </Paper>
            </Box>
          )}
          {userIdInLocalStorage && (
            <Paper sx={{ p: 0.5, display: { xs: "flex" } }}>
              <Stack
                className="logged-user-text-and-logout"
                direction="row"
                spacing={2}
              >
                <Typography variant="body1" display="block" mx={2} py={1}>
                  You are logged in as:{" "}
                  <strong>
                    {getUserNameFromId(Number(userIdInLocalStorage))}
                  </strong>
                </Typography>

                <Button
                  className="logout-btn"
                  variant="outlined"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Stack>
            </Paper>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
