import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IResource } from "../utils/interfaces";

interface Tags {
  name: string;
  times_used?: number;
}

interface Props {
  resources: IResource[];
  setFilteredResults: (data: IResource[]) => void;
}

const Search = (props: Props): JSX.Element => {
  const { resources, setFilteredResults } = props;
  const [tags, setTags] = useState<Tags[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // const [filteredResults, setFilteredResults] = useState<any[]>([]);

  const searchResources = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredResults(
      resources.filter((resource) => {
        return (
          resource.resource_name?.includes(keyword) ||
          resource.content_type?.includes(keyword) ||
          resource.user_name?.includes(keyword) ||
          resource.tags?.includes(keyword)
        );
      })
    );
  };

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;

    const fetchTags = async () => {
      try {
        const res = await axios.get(`${baseUrl}/tags/popular`);
        setTags(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  return (
    <>
      <Grid container pt={3}>
        <Grid item xs></Grid>
        <Grid
          item
          xs={6}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={(e) => searchResources(e)}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                id="search"
                label="Search resources"
                variant="outlined"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Stack>
          </form>
          <Grid item py={2}>
            <Stack direction="row" spacing={1}>
              <Typography>Popular tags:</Typography>
              {tags.map((tag) => {
                return (
                  <Chip
                    key={tag.name}
                    id="tag"
                    color="secondary"
                    clickable={true}
                    label={tag.name}
                    onClick={() => setKeyword(tag.name)}
                  />
                );
              })}
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
};

export default Search;
