import { ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { Comment } from "../utils/interfaces";

interface CommentComponentProps extends Comment {
  setRefetchComments: React.Dispatch<React.SetStateAction<number>>;
}

function CommentComponent({
  id,
  resource_id,
  author_id,
  is_like,
  text,
  created_at,
  name,
  is_faculty,
  setRefetchComments,
}: CommentComponentProps): JSX.Element {
  // const handleDelete = () => {
  //   axios
  //     .delete(
  //       `https://bibliotech-project.herokuapp.com${paste_id}/comments/${comment_id}`
  //     )
  //     .then(() => setRefetchComments((prevRefetch) => -prevRefetch));
  // };

  return (
    <>
      <ListItem >
        {/* <IconButton>
          <DeleteIcon />
        </IconButton> */}
        <ListItemText primary={name} />
        <ListItemText secondary={text} />
        <ListItemText secondary={created_at} />
      </ListItem>
    </>
  );
}

export default CommentComponent;
