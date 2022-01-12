import { useState, useEffect } from "react";
import axios from "axios";
import { List, Typography } from "@mui/material";
import CommentComponent from "./CommentComponent";
import { Comment } from "../utils/interfaces";
import { Box } from "@mui/material";
// import SubmitComment from "./SubmitComment";

interface CommentsSectionProps {
  resource_id: number;
}

export default function CommentsSection({
  resource_id,
}: CommentsSectionProps): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/resources/${resource_id}/comments`
        );
        setComments(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [refetchComments, resource_id]);

  return (
    <>
      <Typography variant="h6">Comments:</Typography>
      <List>
        {comments
          ? comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                id={comment.id}
                resource_id={comment.resource_id}
                setRefetchComments={setRefetchComments}
                author_id={comment.author_id}
                is_like={comment.is_like}
                text={comment.text}
                created_at={comment.created_at}
                name={comment.name}
                is_faculty={comment.is_faculty}
              />
            ))
          : "No comments"}
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
      </List>
    </>
  );
}
