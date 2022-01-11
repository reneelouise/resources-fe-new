import { IResource } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
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
          <CommentsSection resource_id={id} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
