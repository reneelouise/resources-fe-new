import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Comment } from "../utils/interfaces";
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { timestampConverter } from "../utils/timestampConverter";
import { getInitialsFromName } from "../utils/getInitialsFromName";

interface CommentListProps {
  comments: Comment[];
  resourceId: number;
  refetchValue: number;
  toggleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const { comments } = props;

  //   const handleCommentDelete = () => {
  //    const baseUrl = process.env.REACT_APP_API_URL;
  //    axios
  //   .delete(`${baseUrl}${paste_id}/comments/${comment_id}`)
  //   .then(() => setRefetchComments((prevRefetch) => -prevRefetch));
  //   };

  return (
    <List>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <ListItem key={comment.id}>
            <Paper sx={{ padding: "12px", width: "100%" }} elevation={2}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar>{getInitialsFromName(comment.name)}</Avatar>
                </Grid>

                <Grid justifyContent="left" item xs zeroMinWidth>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="h6" gutterBottom>
                      {comment.name}{" "}
                      {comment.is_faculty ? " (Academy Faculty)" : ""}
                    </Typography>
                    <Box>
                      {comment.is_like ? (
                        <ThumbUpIcon color="success" />
                      ) : (
                        <ThumbDownIcon color="error" />
                      )}
                    </Box>
                  </Stack>

                  <Typography variant="body1" gutterBottom>
                    {comment.text}
                  </Typography>

                  <Typography variant="caption">
                    Posted {timestampConverter(comment.created_at)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
        ))
      ) : (
        <Typography variant="body1">No comments to show</Typography>
      )}
    </List>
  );
}
