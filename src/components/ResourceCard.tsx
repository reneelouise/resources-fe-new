import { useState } from "react";
import axios from "axios";
import { IResource } from "../utils/interfaces";
import ResourcePopUp from "./ResourcePopUp";
import { Button, Card, Grid, Link, Typography, Box } from "@mui/material";

interface ResourceCardProps {
  resource: IResource;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function ResourceCard(props: ResourceCardProps): JSX.Element {
  const {
    id,
    resource_name,
    user_name,
    content_type,
    tags,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
    url,
  } = props.resource;

  const [open, setOpen] = useState<boolean>(false);

  const baseUrl = process.env.REACT_APP_API_URL;

  const handleDeleteResource = () => {
    axios
      .delete(`${baseUrl}/resources/${id}`)
      .then(() => props.setRefetch((prev) => -prev));
  };

  const formatContentType = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <>
      <Card sx={{ minWidth: "100%", mb: 2, p: 2 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={10}>
            <Box>
              <Typography variant="h6" component="h6" py={1}>
                {resource_name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Link href={url} style={{ textDecoration: "none" }} target="_blank">
              <Button color="primary" variant="outlined">
                Go to resource
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Recommended By:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" component="h6">
              {user_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Content Type:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" component="h6">
              {formatContentType(content_type)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Tags:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" component="h6">
              {!tags ? "No tags added" : tags}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Likes: {count_of_likes}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Dislikes: {count_of_dislikes}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              {number_of_comments} comments
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{ mr: 1 }}
          >
            Open
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteResource}
          >
            Delete
          </Button>
        </Grid>
        <ResourcePopUp
          resource={props.resource}
          open={open}
          handleOpen={(newValue) => setOpen(newValue)}
        />
      </Card>
    </>
  );
}
