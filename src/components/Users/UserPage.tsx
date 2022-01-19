import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PopularResources from "../PopularResources";
import PopularContributors from "../PopularContributors";
import { IUser, IUserRecentRecommendations } from "../../utils/interfaces";

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
  }, []);

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
  }, []);

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
            {recentRecs.map((rec, i) => {
              return (
                <Typography key={i + 1} variant="body1">
                  {rec.text}
                </Typography>
              );
            })}
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
