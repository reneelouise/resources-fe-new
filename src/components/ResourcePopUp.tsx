import { useState, useEffect } from "react";
import axios from "axios";
import { IResource } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import SubmitComment from "./SubmitComment";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface ResourcePopUpProps {
  resource: IResource;
  handleOpen: (newValue: boolean) => void;
  open: boolean;
}

export default function ResourcePopUp(props: ResourcePopUpProps): JSX.Element {
  const {
    id,
    resource_name,
    user_name,
    content_type,
    tags,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
  } = props.resource;

  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/resources/${id}/comments`);
        setComments(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [refetchComments, id]);

  return (
    <Dialog
      fullWidth
      scroll="paper"
      sx={{ height: "100%" }}
      open={props.open}
      onClose={() => props.handleOpen(false)}
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
          {/* <CommentsSection
            comments={[...comments]}
            setRefetchComments={setRefetchComments}
          /> */}
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "17%",
            top: "65%",
          }}
        >
          {/* <SubmitComment
            resource_id={id}
            user_id={localStorage.getItem("loggedInUser")}
            setRefetchComments={setRefetchComments}
            // setRefetch={props.setRefetch}
          /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
