import axios from "axios";
import { useState, useEffect } from "react";
import { Resource } from "./Resource";
import { IResource } from "../utils/interfaces";
import PopularResources from "../components/PopularResources";
import Search from "../components/Search";

import { Box, Container, Divider, Grid } from "@mui/material";

export default function ResourceLis(): JSX.Element {
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetch, setRefetch] = useState<number>(1);
  const [filteredResults, setFilteredResults] = useState<IResource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${baseUrl}/resources`);
        setResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, [refetch]);

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <Search
            resources={resources}
            setFilteredResults={setFilteredResults}
          />
        </Grid>
        <Divider variant="middle" />
        <Grid item xs={7} pr={3}>
          <Box>
            {filteredResults.length < 1
              ? resources.map((resource) => (
                  <div key={resource.id}>
                    <Resource {...resource} setRefetch={setRefetch} />
                  </div>
                ))
              : filteredResults.map((resource) => (
                  <div key={resource.id}>
                    <Resource {...resource} setRefetch={setRefetch} />
                  </div>
                ))}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <PopularResources />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
