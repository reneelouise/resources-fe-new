import { useState } from "react";
import PopularResources from "./PopularResources";
import Search from "./Search";
import ResourceList from "./ResourceList";
import { Container, Divider, Grid } from "@mui/material";

export default function ResourceListPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tagSelection, setTagSelection] = useState<string[]>([]);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <Search
            tagSelection={tagSelection}
            setTagSelection={setTagSelection}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container pt={1} spacing={2} columns={{ xs: 4, md: 8, lg: 12 }}>
        <Grid item xs={4} md={5} lg={8}>
          <ResourceList tagSelection={tagSelection} searchTerm={searchTerm} />
        </Grid>
        <Grid item xs={4} md={3} lg={4}>
          <PopularResources />
        </Grid>
      </Grid>
    </Container>
  );
}
