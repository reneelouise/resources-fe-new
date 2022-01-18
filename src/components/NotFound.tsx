import { Button, Container, Grid, Link, Typography } from "@mui/material";

export default function NotFound(): JSX.Element {
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
            <Typography variant="h3">Lost in the library?</Typography>
            <Typography variant="body1" my={2}>
              This page was not found.
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
