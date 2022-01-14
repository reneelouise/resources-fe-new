import { useState, useEffect } from "react";
import axios from "axios";
import { Chip, Grid, Stack, TextField, Typography } from "@mui/material";

interface Tags {
  name: string;
  times_used?: number;
}

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export default function Search(props: SearchProps): JSX.Element {
  const { searchTerm, setSearchTerm } = props;

  const [tags, setTags] = useState<Tags[]>([]);

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
      <Grid
        container
        pt={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={2}>
            <TextField
              autoComplete="off"
              fullWidth
              id="search"
              label="Search resources"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
          <Grid container py={2} justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={1}>
              <Typography pt={0.5}>Popular tags:</Typography>
              {tags.map((tag) => {
                return (
                  <Chip
                    key={tag.name}
                    id="tag"
                    color="secondary"
                    clickable={true}
                    label={tag.name}
                    onClick={() => setSearchTerm(tag.name)}
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
}
