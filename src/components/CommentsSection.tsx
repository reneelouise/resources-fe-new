import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import CommentList from "./CommentList";
import SubmitComment from "./SubmitComment";
import { IResource, Comment } from "../utils/interfaces";

interface CommentsSectionProps {
  resource: IResource;
}

export default function CommentsSection(
  props: CommentsSectionProps
): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchValue, toggleRefetch] = useState<number>(1);
  const { userId } = useContext(UserContext);
  const {
    id,
    user_id,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
    recommendation_type,
  } = props.resource;

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${baseUrl}/resources/${id}/comments`);
        setComments(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [refetchValue, id]);

  const checkCommentsForUserRecommendation = (): boolean => {
    return comments.map((comment) => comment.author_id === userId).length > 0
      ? true
      : false;
  };

  return (
    <>
      <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            padding: "16px",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={2}
        >
          {userId && userId === parseInt(user_id) ? (
            <Typography>You said: {recommendation_type}</Typography>
          ) : (
            <>
              {checkCommentsForUserRecommendation() ? (
                <Typography>
                  You have already added a comment to this resource
                </Typography>
              ) : (
                <SubmitComment
                  resource_id={id}
                  user_id={userId}
                  refetchValue={refetchValue}
                  toggleRefetch={toggleRefetch}
                />
              )}
            </>
          )}
        </Paper>
      </Box>
      <Grid container py={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6">Comments</Typography>
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack direction="row" spacing={1}>
                <ThumbUpIcon color="success" />
                <Typography variant="body1">{count_of_likes}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <ThumbDownIcon color="error" />
                <Typography variant="body1">{count_of_dislikes}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CommentIcon color="primary" />
                <Typography variant="body1">{number_of_comments}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CommentList
              comments={comments}
              resourceId={id}
              refetchValue={refetchValue}
              toggleRefetch={toggleRefetch}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
