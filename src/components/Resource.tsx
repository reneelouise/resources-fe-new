import { useState, useEffect } from "react";
import { IResource, Comment } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import { SubmitComment } from "./SubmitComment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";

interface ResourceProps extends IResource {
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const Resource = (props: ResourceProps): JSX.Element => {
  const {
    id,
    resource_name,
    user_name,
    content_type,
    tags,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/resources/${props.id}/comments`
        );
        setComments(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [refetchComments, props.id]);

  const handleDeleteResource = () => {
    axios
      .delete(`${baseUrl}/resources/${props.id}`)
      .then(() => props.setRefetch((prev) => -prev));
  };

  const formatContentType = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1);
  };

  return (
    <>
      <Card sx={{ minWidth: "100%", mb: 2, p: 2 }}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" component="h6" py={1}>
              {resource_name}
            </Typography>
          </Box>
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
      </Card>
      <Dialog
        fullWidth
        scroll="paper"
        sx={{ height: "100%" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{resource_name}</DialogTitle>
        <DialogContent style={{ height: "450px" }}>
          <Typography> Author: {user_name} </Typography>
          <Typography variant="body2">Content type: {content_type}</Typography>
          <Typography variant="body2"> Tags: {tags} </Typography>
          <Typography variant="body2">
            <ThumbUpIcon /> {count_of_likes}
            <ThumbDownIcon /> {count_of_dislikes}
            {number_of_comments} comments
          </Typography>
          <Box
            style={{
              position: "absolute",
              left: "17%",
              top: "75%",
            }}
          >
            <CommentsSection
              comments={comments}
              setRefetchComments={setRefetchComments}
            />
          </Box>
          <Box
            style={{
              position: "absolute",
              left: "17%",
              top: "65%",
            }}
          >
            <SubmitComment
              resource_id={id}
              user_id={localStorage.getItem("loggedInUser")}
              setRefetchComments={setRefetchComments}
              setRefetch={props.setRefetch}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Resource;
