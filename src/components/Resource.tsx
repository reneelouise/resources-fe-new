import { useState, useEffect } from "react";
import { IResource, Comment } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import { SubmitComment } from "./SubmitComment";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Typography,
  Box,
} from "@mui/material";
import {
  OpenInFull as OpenInFullIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";

interface ResourceProps extends IResource {
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export const Resource = (props: ResourceProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/resources/${props.id}/comments`);
      setComments(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refetchComments]);

  const handleDeleteResource = () => {
    axios
      .delete(`${baseUrl}/resources/${props.id}`)
      .then(() => props.setRefetch((prev) => -prev));
  };

  return (
    <>
      <Card sx={{ width: "250px" }}>
        <Typography variant="h6" component="h6">
          {props.id}
        </Typography>
        <Typography>Author: {props.user_name}</Typography>
        <Typography variant="body2">
          Content type: {props.content_type}
        </Typography>
        <Typography variant="body2">Tags: {props.tags}</Typography>
        <Typography variant="body2">
          <ThumbUpIcon /> {props.count_of_likes}
          <ThumbDownIcon /> {props.count_of_dislikes}
          {props.number_of_comments} comments
        </Typography>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <Typography>Expand</Typography>
          <OpenInFullIcon />
        </IconButton>
        <IconButton onClick={handleDeleteResource}>
          <DeleteIcon />
        </IconButton>
      </Card>
      <Dialog
        fullWidth
        scroll="paper"
        sx={{ height: "100%" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>{props.name}</DialogTitle>
        <DialogContent style={{ height: "450px" }}>
          <Typography> Author: {props.user_name} </Typography>
          <Typography variant="body2">
            Content type: {props.content_type}
          </Typography>
          <Typography variant="body2"> Tags: {props.tags} </Typography>
          <Typography variant="body2">
            <ThumbUpIcon /> {props.count_of_likes}
            <ThumbDownIcon /> {props.count_of_dislikes}
            {props.number_of_comments} comments
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
              resource_id={props.id}
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
