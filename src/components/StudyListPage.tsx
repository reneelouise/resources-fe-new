import { useContext } from "react";
import StudyList from "./StudyList";
import YourSubmittedResources from "./YourSubmittedResources";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

export default function StudyListPage(): JSX.Element {
  const { itemsInStudyList } = useContext(UserContext);
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" pt={3}>
            Your Study List
          </Typography>
          <Typography variant="body1" py={2}>
            Showing {itemsInStudyList.length} items
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
