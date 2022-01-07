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
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Header = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
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
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
            >
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Resources
              </Button>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Study List
              </Button>
            </Stack>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              BiblioTech
            </Typography>

            {!showLogInForm && !loggedInUser && (
              <Button color="inherit" onClick={() => setShowLogInForm(true)}>
                Login
              </Button>
            )}
            {showLogInForm && !loggedInUser && (
              <Box>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                  <Stack direction="row" spacing={2}>
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        minWidth: "200px",
                        // margin: "0",
                        fontSize: "16px",
                      }}
                    >
                      <InputLabel id="select-user-label">
                        Select a user
                      </InputLabel>

                      <Select
                        labelId="select-user"
                        id="users"
                        value={selectedUser}
                        label="Select user"
                        onChange={(e) => handleSelectChange(e.target.value)}
                      >
                        {users.map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <Button color="inherit" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => setShowLogInForm(false)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </FormControl>
              </Box>
            )}
            {loggedInUser && (
              <>
                <Typography variant="body1" display="block" mr={3}>
                  <em>You are logged in as user {loggedInUser}</em>
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
