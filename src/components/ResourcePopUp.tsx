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
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { timestampConverter } from "../utils/timestampConverter";
import { formatContentType } from "../utils/formatContentType";

interface ResourcePopUpProps {
  resource: IResource;
  handleOpen: (newValue: boolean) => void;
  open: boolean;
  refetchValue: number;
  toggleRefetch: React.Dispatch<React.SetStateAction<number>>;
}

export default function ResourcePopUp(props: ResourcePopUpProps): JSX.Element {
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
      maxWidth={"xl"}
      scroll="paper"
      sx={{ height: "100%" }}
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
          <Typography variant="h6" component="h6" py={1}>
            {resource_name}
          </Typography>
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
            <Typography variant="body1">Content Type:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {formatContentType(content_type)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1">Description:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{description}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1">Tags:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {!tags ? "No tags added" : tags}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body1">Added:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {timestampConverter(created_at)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1">{recommendation_type}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{recommendation_reason}</Typography>
          </Grid>
        </Grid>

        <CommentsSection
          resource={props.resource}
          refetchValue={props.refetchValue}
          toggleRefetch={props.toggleRefetch}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
