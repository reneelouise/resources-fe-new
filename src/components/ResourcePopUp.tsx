import { IResource } from "../utils/interfaces";
import CommentsSection from "./CommentsSection";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import timestampConverter from "../utils/timestampConverter";

interface ResourcePopUpProps {
  resource: IResource;
  handleOpen: (newValue: boolean) => void;
  open: boolean;
}

export default function ResourcePopUp(props: ResourcePopUpProps): JSX.Element {
  const formatContentType = (word: string): string => {
    return word[0].toUpperCase() + word.slice(1);
  };
  const {
    resource_name,
    user_name,
    created_at,
    description,
    is_faculty,
    url,
    content_type,
    tags,
    recommendation_type,
    recommendation_reason,
  } = props.resource;

  return (
    <Dialog
      fullWidth
      scroll="paper"
      sx={{ height: "100%" }}
      open={props.open}
      onClose={() => props.handleOpen(false)}
    >
      <DialogTitle>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={8}>
            <Box>
              <Typography variant="h6" component="h6" py={1}>
                {resource_name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Link href={url} style={{ textDecoration: "none" }} target="_blank">
              <Button
                color="primary"
                variant="outlined"
                endIcon={<OpenInNewIcon />}
              >
                Go to resource
              </Button>
            </Link>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ height: "450px" }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" component="h6">
              Recommended By:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="h6">
              {user_name}
              {is_faculty ? " (Academy Faculty)" : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" component="h6">
              Content Type:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="h6">
              {formatContentType(content_type)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" component="h6">
              Description:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="h6">
              {description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" component="h6">
              Tags:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="h6">
              {!tags ? "No tags added" : tags}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1" component="h6">
              Added:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" component="h6">
              {timestampConverter(created_at)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1" component="h6">
              {recommendation_type}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="h6">
              {recommendation_reason}
            </Typography>
          </Grid>
        </Grid>

        <CommentsSection resource={props.resource} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
