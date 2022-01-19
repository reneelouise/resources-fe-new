import { Container, Divider, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PopularResources from "../PopularResources";
import PopularContributors from "../PopularContributors";

export default function UserPage(): JSX.Element {
  const params = useParams();
  const userId = params.userId ? parseInt(params.userId, 10) : 0;
  console.log(userId);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" pt={3}>
              User Page for {params.userId}
            </Typography>
            <Typography variant="body1" py={2}>
              <Link to={`/users/`}>View all users</Link>
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container pt={2} spacing={2} columns={{ xs: 4, md: 8, lg: 12 }}>
          <Grid item xs={4} md={5} lg={8}>
            Content will go here
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
