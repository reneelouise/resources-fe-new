import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface SubmitCommentProps {
  resource_id: number;
  user_id: number | null;
  refetchCommentsValue: number;
  toggleCommentsRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function SubmitComment(props: SubmitCommentProps): JSX.Element {
  const { resource_id, user_id } = props;
  const [commentInput, setCommentInput] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean | undefined>(undefined);

  const handleCommentSubmit = () => {
    axios
      .post(
        `https://bibliotech-project.herokuapp.com/resources/${resource_id}/comments`,
        {
          resource_id: resource_id,
          author_id: user_id,
          is_like: isLike,
          text: commentInput,
        }
      )
      .then(() => setCommentInput(""))
      .then(() => setIsLike(undefined))
      .then(() => props.toggleCommentsRefetch((prev) => -prev))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Typography variant="h6" pb={2}>
        Would you recommend this resource?
      </Typography>
      <Stack direction="row" spacing={2} sx={{ width: "80%" }}>
        <Button
          color="success"
          variant={isLike === true ? "contained" : "outlined"}
          sx={{ width: "50%" }}
          onClick={() => setIsLike(true)}
          startIcon={<ThumbUpIcon />}
        >
          Yes
        </Button>
        <Button
          color="error"
          variant={isLike === false ? "contained" : "outlined"}
          sx={{ width: "50%" }}
          onClick={() => setIsLike(false)}
          startIcon={<ThumbDownIcon />}
        >
          No
        </Button>
      </Stack>

      {isLike !== undefined && (
        <Stack direction="row" py={2} spacing={2} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            onChange={(e) => setCommentInput(e.target.value)}
            id="standard-required"
            label="Add a comment..."
            variant="outlined"
            value={commentInput}
          />

          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsLike(undefined)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCommentSubmit}>
            Submit
          </Button>
        </Stack>
      )}
    </>
  );
}
