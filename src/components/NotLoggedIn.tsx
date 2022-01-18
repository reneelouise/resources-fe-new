import { Button, Container, Grid, Link, Typography } from "@mui/material";

export default function NotLoggedIn(): JSX.Element {
  return (
    <Container maxWidth="xl">
      <Grid container columns={{ xs: 12 }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} mt={10}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3">You are not logged in</Typography>
            <Typography variant="body1" my={2}>
              You need to be logged in to view this page.
            </Typography>
            <Link href="/resources" underline="none">
              <Button
                className="404-redirect"
                variant="contained"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Go back to resources
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Container>
  );
}
