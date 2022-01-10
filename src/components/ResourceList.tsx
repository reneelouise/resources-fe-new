import axios from "axios";
import { useState, useEffect } from "react";
import { Resource } from "./Resource";
import { IResource } from "../utils/interfaces";
import PopularResources from "../components/PopularResources";
import Search from "../components/Search";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const ResourceList = (): JSX.Element => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetch, setRefetch] = useState<number>(1);
  const [filteredResults, setFilteredResults] = useState<IResource[]>([]);

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${baseUrl}/resources`);
      setResources(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [refetch]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Search
              resources={resources}
              setFilteredResults={setFilteredResults}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
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
};

export default ResourceList;
