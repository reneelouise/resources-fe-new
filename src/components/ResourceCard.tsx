import { useState } from "react";
import axios from "axios";
import { IResource } from "../utils/interfaces";
import ResourcePopUp from "./ResourcePopUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { timestampConverter } from "../utils/timestampConverter";
import { formatContentType } from "../utils/formatContentType";

interface ResourceCardProps {
  resource: IResource;
  refetchValue: number;
  isOnStudyList: boolean;
  toggleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function ResourceCard(props: ResourceCardProps): JSX.Element {
  const {
    id,
    resource_name,
    description,
    user_name,
    is_faculty,
    content_type,
    tags,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
    created_at,
    recommendation_type,
    recommendation_reason,
    url,
  } = props.resource;

  const [open, setOpen] = useState<boolean>(false);

  const isLoggedIn = !!localStorage.getItem("loggedInUser");
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleDeleteResource = () => {
    axios
      .delete(`${baseUrl}/resources/${id}`)
      .then(() => props.toggleRefetch((prev) => -prev));
  };

  const addToStudyList = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    axios
      .post(`${baseUrl}/users/${loggedInUser}/study_list`, { resource_id: id })
      .then(() => props.toggleRefetch((prev) => -prev));
  };

  const removeFromStudyList = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    axios
      .delete(`${baseUrl}/users/${loggedInUser}/study_list/${id}`)
      .then(() => props.toggleRefetch((prev) => -prev));
  };

  return (
    <Card variant="outlined" sx={{ minWidth: "100%", mb: 2, p: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h5">{resource_name}</Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Posted {timestampConverter(created_at)}
            </Typography>
          </Box>
          <Link href={url} style={{ textDecoration: "none" }} target="_blank">
            <Button
              color="primary"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
            >
              Go to resource
            </Button>
          </Link>
        </Stack>
      </CardContent>
      <CardContent>
        <Grid container>
          <Grid item>
            <Typography variant="body1">
              <strong>{user_name}</strong>
              {is_faculty ? " (Academy Faculty)" : ""} says{" "}
              <em>"{recommendation_type}"</em>
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Content Type:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              {formatContentType(content_type)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Description:</Typography>
          </Grid>
          <Grid item xs={9}>
            {description !== " " ? (
              <Typography variant="body1">{description}</Typography>
            ) : (
              <Typography variant="body1">No description</Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Tags:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Stack direction="row" spacing={1}>
              {tags !== null ? (
                tags?.split(", ").map((tag, i) => {
                  return (
                    <Chip
                      key={i + 1}
                      id="tag"
                      variant="outlined"
                      color="default"
                      clickable={true}
                      label={tag}
                    />
                  );
                })
              ) : (
                <Typography variant="body1">No tags</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1" component="h6"></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="h6">
              {recommendation_reason}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={2}
          px={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack direction="row" spacing={1}>
            <ThumbUpIcon color="success" />
            <Typography variant="body1">{count_of_likes}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <ThumbDownIcon color="error" />
            <Typography variant="body1">{count_of_dislikes}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <CommentIcon color="primary" />
            <Typography variant="body1">{number_of_comments}</Typography>
          </Stack>
        </Stack>
        <Grid container direction="row" justifyContent="flex-end" p={2}>
          {isLoggedIn ? (
            <>
              {!props.isOnStudyList ? (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => addToStudyList()}
                  sx={{ mr: 1 }}
                >
                  Add to study list
                </Button>
              ) : (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => removeFromStudyList()}
                  sx={{ mr: 1 }}
                >
                  Remove from study list
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
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
      </CardActions>
      <ResourcePopUp
        resource={props.resource}
        open={open}
        refetchValue={props.refetchValue}
        toggleRefetch={props.toggleRefetch}
        handleOpen={(newValue) => setOpen(newValue)}
      />
    </Card>
  );
}
