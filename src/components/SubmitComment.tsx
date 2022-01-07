import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface SubmitCommentProps {
  resource_id: number;
  author_id: string;
  setRefetchComments: React.Dispatch<React.SetStateAction<number>>;
}

export function SubmitComment({
  resource_id,
  author_id,
  setRefetchComments,
}: SubmitCommentProps): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>();
  const handleSubmit = () => {
    axios
      .post(
        `https://bibliotech-project.herokuapp.com/resources/${resource_id}/comments`,
        {
          resource_id: resource_id,
          author_id: author_id,
          is_like: isLike,
          text: input,
        }
      )
      .then(() => setRefetchComments((prevRefetch) => -prevRefetch))
      .then(() => setInput(""))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <ThumbUpIcon onClick={() => setIsLike(true)} />
      <ThumbDownIcon onClick={() => setIsLike(false)} />
      <TextField
        onChange={(e) => setInput(e.target.value)}
        id="standard-required"
        label="Submit a coment"
        variant="standard"
        value={input}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}
