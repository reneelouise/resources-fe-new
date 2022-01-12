import { useState, useEffect } from "react";
import axios from "axios";
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
import timestampConverter from "../utils/timestampConverter";

interface CommentListProps {
  resourceId: number;
}

export default function CommentList(props: CommentListProps): JSX.Element {
  const { resourceId } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchComments, setRefetchComments] = useState<number>(1);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/resources/${resourceId}/comments`
        );
        setComments(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [refetchComments, resourceId]);

  //   const handleCommentDelete = () => {
  // const baseUrl = process.env.REACT_APP_API_URL;
  // axios
  //   .delete(`${baseUrl}${paste_id}/comments/${comment_id}`)
  //   .then(() => setRefetchComments((prevRefetch) => -prevRefetch));
  //   };

  return (
    <List>
      {comments
        ? comments.map((comment) => (
            <ListItem key={comment.id}>
              <Paper sx={{ padding: "12px", width: "100%" }} elevation={2}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar alt={comment.name} src="#" />
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
        : "No comments"}
    </List>
  );
}
