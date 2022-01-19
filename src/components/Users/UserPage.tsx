import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Divider,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PopularResources from "../PopularResources";
import PopularContributors from "../PopularContributors";
import { IUser, IUserRecentRecommendations } from "../../utils/interfaces";
import { timestampConverter } from "../../utils/timestampConverter";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function UserPage(): JSX.Element {
  const params = useParams();
  const userId = params.userId ? parseInt(params.userId, 10) : 0;
  const [recentRecs, setRecentRecs] = useState<IUserRecentRecommendations[]>(
    []
  );
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        const specificUser = res.data.data.filter(
          (user: IUser) => user.id === userId
        );
        setUser(specificUser[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchRecentRecs = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        if (userId) {
          const res = await axios.get(
            `${baseUrl}/users/${userId}/recent_recommendations`
          );
          console.log(res);
          setRecentRecs(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentRecs();
  }, [userId]);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" pt={3}>
              <Link to={`/users/`}>View all users</Link>
            </Typography>
            <Typography variant="h4" py={2}>
              {user && user.name}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container pt={2} spacing={2} columns={{ xs: 4, md: 8, lg: 12 }}>
          <Grid item xs={4} md={5} lg={8}>
            <Typography variant="body1" py={2}>
              {user ? user.name + "'s recent comments:" : "Recent comments:"}
            </Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: "250px" }}>
                      Resource Name
                    </TableCell>
                    <TableCell sx={{ minWidth: "40px" }}>Type</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell align="right" sx={{ minWidth: "100px" }}>
                      Posted
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentRecs.map((rec, i) => (
                    <TableRow key={i + 1}>
                      <TableCell component="th" scope="row">
                        {rec.resource_name}
                      </TableCell>
                      <TableCell>
                        {rec.is_like ? (
                          <ThumbUpIcon color="success" />
                        ) : (
                          <ThumbDownIcon color="error" />
                        )}
                      </TableCell>
                      <TableCell>{rec.text ? rec.text : "-"}</TableCell>
                      <TableCell align="right">
                        {timestampConverter(rec.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4} md={3} lg={4}>
            <PopularResources />
            <PopularContributors />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
