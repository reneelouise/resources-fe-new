import { List, Typography } from "@mui/material";
import CommentComponent from "./CommentComponent";
import { Comment } from "../utils/interfaces";

interface CommentsSectionProps {
  comments: Comment[];
  setRefetchComments: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentsSection({
  comments,
  setRefetchComments,
}: CommentsSectionProps): JSX.Element {
  return (
    <>
      <Typography variant="h6">Comments:</Typography>
      <List>
        {comments.map((comment) => (
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
        ))}
      </List>
    </>
  );
}
