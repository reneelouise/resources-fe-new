import { useState } from "react";
import { IResource } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import { Link as RouterLink } from "react-router-dom";
import Highlighter from "react-highlight-words";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { timestampConverter } from "../utils/timestampConverter";
import { formatContentType } from "../utils/formatContentType";

interface ResourcePopUpProps {
  searchTerm: string;
  resource: IResource;
  handleOpen: (newValue: boolean) => void;
  open: boolean;
  toggleRefetchResources: () => void;
}

export default function ResourcePopUp(props: ResourcePopUpProps): JSX.Element {
  const { resource, searchTerm } = props;
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const {
    resource_name,
    user_name,
    user_id,
    created_at,
    description,
    is_faculty,
    mark_stage,
    url,
    content_type,
    tags,
    recommendation_type,
    recommendation_reason,
  } = props.resource;

  const handleCopyClick = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setIsCopying(false), 1500);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      scroll="paper"
      open={props.open}
      onClose={() => props.handleOpen(false)}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h6">
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={resource_name}
              />
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Posted {timestampConverter(created_at)}
            </Typography>
          </Box>
          <Link href={url} style={{ textDecoration: "none" }} target="_blank">
            <Button
              color="primary"
              variant="outlined"
              endIcon={<OpenInNewIcon />}
            >
              Go to resource
            </Button>
          </Link>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              Recommended By:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <RouterLink to={`/users/${user_id}`}>
              <Typography variant="body1" py={1} sx={{ display: "inline" }}>
                <strong>
                  <Highlighter
                    highlightClassName="YourHighlightClass"
                    searchWords={[props.searchTerm]}
                    autoEscape={true}
                    textToHighlight={user_name}
                  />
                </strong>
              </Typography>
            </RouterLink>
            <Typography variant="body1" py={1} sx={{ display: "inline" }}>
              {is_faculty ? " (Academy Faculty)" : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1" component="h6">
              URL:
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body1"
              component="h6"
              sx={{
                fontFamily: "monospace",
                fontSize: "0.9rem",
                display: "inline",
              }}
            >
              {url.length < 40 ? url : url.substring(0, 40) + "..."}
            </Typography>
            <IconButton
              aria-label="copy-url"
              sx={{ padding: "0", margin: "0 4px 0 4px" }}
              onClick={handleCopyClick}
            >
              <ContentCopyIcon sx={{ color: "#9e9e9e", height: "20px" }} />
            </IconButton>

            {isCopying && (
              <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                Copied!
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Content Type:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              {content_type ? (
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={formatContentType(content_type)}
                />
              ) : (
                "Not found"
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Description:</Typography>
          </Grid>
          <Grid item xs={9}>
            {description !== "" ? (
              <Typography variant="body1">
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={description}
                />
              </Typography>
            ) : (
              <Typography variant="body1">No description</Typography>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Mark Stage:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">{mark_stage}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Tags:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              {!tags ? "No tags added" : tags}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">Added:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              {timestampConverter(created_at)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="body1">
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={user_name}
              />{" "}
              says:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              <strong>{recommendation_type}</strong>
            </Typography>

            {recommendation_reason !== "" && (
              <Typography>
                <em>"{recommendation_reason}"</em>
              </Typography>
            )}
          </Grid>
        </Grid>

        <CommentsSection
          resource={resource}
          toggleRefetchResources={props.toggleRefetchResources}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
