import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import {
  Box,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import CommentList from "./CommentList";
import SubmitComment from "./SubmitComment";
import { IResource, Comment } from "../utils/interfaces";

interface CommentsSectionProps {
  resource: IResource;
  toggleRefetchResources: () => void;
}

export default function CommentsSection(
  props: CommentsSectionProps
): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refetchCommentsValue, toggleCommentsRefetch] = useState<number>(1);
  const [filter, setFilter] = useState("all");

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
  }, [refetchCommentsValue, id]);

  const checkCommentsForUserRecommendation = (): boolean => {
    return comments.filter((comment) => comment.author_id === userId).length > 0
      ? true
      : false;
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ): void => {
    setFilter(newFilter);
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === "likes") {
      return comment.is_like === true;
    } else if (filter === "dislikes") {
      return comment.is_like === false;
    } else {
      return comment;
    }
  });

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
                  refetchCommentsValue={refetchCommentsValue}
                  toggleCommentsRefetch={toggleCommentsRefetch}
                  toggleRefetchResources={props.toggleRefetchResources}
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
            {filter === "all" && (
              <Typography variant="h6">Showing all comments</Typography>
            )}
            {filter === "likes" && (
              <Typography variant="h6">Showing just likes</Typography>
            )}
            {filter === "dislikes" && (
              <Typography variant="h6">Showing just dislikes</Typography>
            )}

            <ToggleButtonGroup
              color="primary"
              value={filter}
              exclusive
              onChange={handleFilter}
            >
              <ToggleButton value="likes">
                <ThumbUpIcon color="success" sx={{ marginRight: "6px" }} />
                {count_of_likes}
              </ToggleButton>
              <ToggleButton value="dislikes">
                <ThumbDownIcon color="error" sx={{ marginRight: "6px" }} />
                {count_of_dislikes}
              </ToggleButton>
              <ToggleButton value="all">
                <CommentIcon color="primary" sx={{ marginRight: "6px" }} />
                {number_of_comments}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CommentList
              comments={filteredComments}
              resourceId={id}
              refetchCommentsValue={refetchCommentsValue}
              toggleCommentsRefetch={toggleCommentsRefetch}
              toggleRefetchResources={props.toggleRefetchResources}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
