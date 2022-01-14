import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import CommentList from "./CommentList";
import SubmitComment from "./SubmitComment";
import { IResource } from "../utils/interfaces";

interface CommentsSectionProps {
  resource: IResource;
}

export default function CommentsSection(
  props: CommentsSectionProps
): JSX.Element {
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
            <SubmitComment
              resource_id={id}
              user_id={userId}
              refetchValue={refetchValue}
              toggleRefetch={toggleRefetch}
            />
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
