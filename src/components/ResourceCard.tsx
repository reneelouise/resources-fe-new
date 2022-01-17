import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { IResource } from "../utils/interfaces";
import ResourcePopUp from "./ResourcePopUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { timestampConverter } from "../utils/timestampConverter";

interface ResourceCardProps {
  resource: IResource;
  toggleRefetchResources: () => void;
}

export default function ResourceCard(props: ResourceCardProps): JSX.Element {
  const { userId, itemsInStudyList, setItemsInStudyList } =
    useContext(UserContext);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const baseUrl = process.env.REACT_APP_API_URL;

  const {
    id,
    resource_name,
    user_name,
    is_faculty,
    tags,
    count_of_likes,
    count_of_dislikes,
    number_of_comments,
    created_at,
    recommendation_type,
    url,
  } = props.resource;

  const handleDeleteResource = () => {
    axios.delete(`${baseUrl}/resources/${id}`);
    props.toggleRefetchResources();
  };

  const addToStudyList = () => {
    setLoading(true);
    console.log(id);
    setItemsInStudyList([...itemsInStudyList, id]);
    axios.post(`${baseUrl}/users/${userId}/study_list`, {
      resource_id: id,
    });
    setTimeout(function delay() {
      setLoading(false);
    }, 2000);
    props.toggleRefetchResources();
  };

  const removeFromStudyList = () => {
    setLoading(true);
    setItemsInStudyList(
      itemsInStudyList.filter((studyListItemId) => studyListItemId !== id)
    );
    axios.delete(`${baseUrl}/users/${userId}/study_list/${id}`);
    setTimeout(function delay() {
      setLoading(false);
    }, 2000);
    props.toggleRefetchResources();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: "100%",
        mb: 2,
        boxShadow: 2,
      }}
    >
      <CardHeader
        title={resource_name}
        subheader={"Posted " + timestampConverter(created_at)}
        action={
          <Link href={url} style={{ textDecoration: "none" }} target="_blank">
            <Button
              color="primary"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
            >
              Go to resource
            </Button>
          </Link>
        }
      />

      <CardContent sx={{ py: 1 }}>
        <Stack direction="row" spacing={1} pb={1}>
          {tags !== null ? (
            tags?.split(", ").map((tag, i) => {
              return (
                <Chip
                  key={i + 1}
                  id="tag"
                  variant="outlined"
                  color="default"
                  clickable={true}
                  label={tag}
                />
              );
            })
          ) : (
            <Typography variant="body1">No tags</Typography>
          )}
        </Stack>

        <Typography variant="body1" py={1}>
          <strong>{user_name}</strong>
          {is_faculty ? " (Academy Faculty)" : ""} says{" "}
          <em>"{recommendation_type}"</em>
        </Typography>
      </CardContent>

      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            px={2}
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {userId ? (
              <>
                {!itemsInStudyList.includes(id) ? (
                  <>
                    {loading === true ? (
                      <Box pr={3}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => addToStudyList()}
                        sx={{ mr: 1 }}
                      >
                        Add to study list
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {loading === true ? (
                      <Box pr={3}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => removeFromStudyList()}
                        sx={{ mr: 1 }}
                      >
                        Remove from study list
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            <Button
              color="primary"
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{ mr: 1 }}
            >
              Expand
            </Button>
            {userId && userId === parseInt(props.resource.user_id) ? (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteResource}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </Stack>
        </div>
      </CardActions>

      <ResourcePopUp
        resource={props.resource}
        open={open}
        handleOpen={(newValue) => setOpen(newValue)}
      />
    </Card>
  );
}
