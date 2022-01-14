import StudyList from "./StudyList";
import YourSubmittedResources from "./YourSubmittedResources";
import { Container, Divider, Grid, Typography } from "@mui/material";

export default function StudyListPage(): JSX.Element {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" py={3}>
            Your Study List
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container pt={2} spacing={2}>
        <Grid item xs={8}>
          <StudyList />
        </Grid>
        <Grid item xs>
          <YourSubmittedResources />
        </Grid>
      </Grid>
    </Container>
  );
}
