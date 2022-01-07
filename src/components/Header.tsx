import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
// import { Link } from "react-router-dom";
import { IUser } from "../utils/interfaces";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Header = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
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
    setLoggedInUser(selectedUser);
    setShowLogInForm(false);
  };

  const handleSelectChange = (userName: string) => {
    setSelectedUser(userName);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Resources
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Study List
              </Button>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
            >
              📚 BiblioTech
            </Typography>

            {!showLogInForm && !loggedInUser && (
              <Paper sx={{ display: { xs: "flex" } }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowLogInForm(true)}
                >
                  Login
                </Button>
              </Paper>
            )}
            {showLogInForm && !loggedInUser && (
              <Box
                sx={{
                  minWidth: "300px",
                  textAlign: "left",
                  display: { xs: "flex" },
                }}
              >
                <Paper sx={{ px: 1.5, py: 0.5 }}>
                  <FormControl variant="outlined">
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
                          displayEmpty
                          sx={{ width: 200, py: 0 }}
                          id="users"
                          value={selectedUser}
                          onChange={(e) => handleSelectChange(e.target.value)}
                        >
                          <MenuItem value="">
                            <em>Select a user</em>
                          </MenuItem>
                          {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                              {user.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => setShowLogInForm(false)}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </FormControl>
                </Paper>
              </Box>
            )}
            {loggedInUser && (
              <Paper sx={{ p: 0.5, display: { xs: "flex" } }}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1" display="block" mx={2} py={1}>
                    You are logged in as user: <strong>{loggedInUser}</strong>
                  </Typography>

                  <Button
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
    </>
  );
};

export default Header;
