import { useState, useEffect } from "react";
import { IResource, Comment } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import CommentComponent from "./CommentComponent";
import { SubmitComment } from "./SubmitComment";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
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
  handleRefetch: () => void;
}

export const Resource = (props: ResourceProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/resources`);
      setResources(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteResource = () => {
    axios
      .delete(`${baseUrl}/resources/${props.id}`)
      .then(() => props.handleRefetch);
  };

  return (
    <>
      {resources.map((resource) => (
        <div key={resource.id}>
          <Resource {...resource} setRefetch={setRefetch} />
        </div>
      ))}
    </>
  );
};

export default Resource;
