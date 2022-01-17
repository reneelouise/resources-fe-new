import { useState, useEffect } from "react";
import axios from "axios";
import { Chip, Grid, Stack, TextField, Typography } from "@mui/material";

interface Tags {
  name: string;
  id: number;
  times_used?: number;
}

interface SearchProps {
  searchTerm: string;
  tagSelection: string[];
  setTagSelection: (tagSelection: string[]) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export default function Search(props: SearchProps): JSX.Element {
  const { searchTerm, setSearchTerm, tagSelection, setTagSelection } = props;

  const [tags, setTags] = useState<Tags[]>([]);
  const [tagColour, setTagColour] = useState<
    (
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning"
      | undefined
    )[]
  >(Array(5).fill("primary"));

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
              {tags.map((tag, i) => {
                return (
                  <Chip
                    key={tag.id}
                    id="tag"
                    color={tagColour[i]}
                    clickable={true}
                    label={tag.name}
                    onClick={() =>
                      tagColour[i] === "primary"
                        ? (setTagSelection([...tagSelection, tag.name]),
                          (tagColour[i] = "secondary"),
                          setTagColour(tagColour))
                        : (setTagSelection(
                            tagSelection.filter((el) => el !== tag.name)
                          ),
                          (tagColour[i] = "primary"),
                          setTagColour(tagColour))
                    }
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
