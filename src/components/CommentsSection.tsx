import { List, Typography } from "@mui/material";
import CommentComponent from "./CommentComponent";
import { Comment } from "../utils/interfaces";

interface CommentsSectionProps {
  comments: Comment[];
  setRefetchComments: React.Dispatch<React.SetStateAction<number>>;
}

function CommentsSection({
  comments,
  setRefetchComments,
}: CommentsSectionProps): JSX.Element {
  return (
    <>
      <Typography variant="h6">Comments:</Typography>
      <List>
        {comments.map(el => (
          <CommentComponent
            key={el.id}
            id={el.id}
            resource_id={el.resource_id}
            setRefetchComments={setRefetchComments}
            author_id={el.author_id}
            is_like={el.is_like}
            text={el.text}
            created_at={el.created_at}
            name={el.name}
            is_faculty={el.is_faculty}
          />
        ))}
      </List>
    </>
  );
}

export default CommentsSection;