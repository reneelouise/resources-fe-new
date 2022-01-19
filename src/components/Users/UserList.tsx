import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { IUser } from "../../utils/interfaces";
import { getInitialsFromName } from "../../utils/getInitialsFromName";

import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";

export default function UserList(): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([]);

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

  return (
    <>
      <Container className="user-list-page" maxWidth="xl">
        <Grid
          container
          mt={3}
          p={0}
          spacing={2}
          columns={{ xs: 12 }}
          sx={{ maxHeight: "100px" }}
        >
          <Grid item xs={5}></Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">All Users</Typography>
            <List>
              {users &&
                users.map((user) => {
                  return (
                    <ListItem key={user.id} alignItems="center">
                      <ListItemAvatar>
                        <Avatar>{getInitialsFromName(user.name)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link to={`/users/${user.id}`}>
                            {user.name} {user.is_faculty ? "(Faculty)" : ""}
                          </Link>
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
          <Grid item xs={5} p={0}></Grid>
        </Grid>
      </Container>

      <Outlet />
    </>
  );
}
