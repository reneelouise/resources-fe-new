import { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Alert,
} from "@mui/material";

export default function CreateNewResource(): JSX.Element {
  const [resourceName, setResourceName] = useState<string>(" ");
  const [description, setDescription] = useState<string>(" ");
  const [url, setUrl] = useState<string>(" ");
  const [contentType, setContentType] = useState<string>(" ");
  const [markStage, setMarkStage] = useState<string>(" ");
  const [recommendationType, setRecommendationType] = useState<string>(" ");
  const [recommendationReason, setRecommendationReason] = useState<string>(" ");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openSubmit, setOpenSubmit] = useState<boolean>(false);

  const content_type = [
    "magazine",
    "book",
    "documentary",
    "events",
    "podcast",
    "video",
    "article",
    "blog",
    "course",
    "eBook",
    "exercise",
    "software tool",
    "documentation",
    "cheatsheet",
    "diagram",
    "reference",
    "youtube channel",
    "organisation",
    "other",
  ];

  const mark_stage = [
    "Week 1: Workflows",
    "Week 2: Typescript and code quality",
    "Week 3: React, HTML and CSS",
    "Week 4: React and event handlers",
    "Week 5: React and useEffect",
    "Week 7: NodeJs and Express",
    "Week 8: SQL and persistence",
    "Week 10+: Full stack projects",
  ];

  const recommendation_type = [
    "I recommend this resource after having used it",
    "I do not recommend this resource, having used it",
    "I haven't used this resource but it looks promising",
  ];

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResourceName(resourceName.trim());
    setDescription(description.trim());
    setUrl(url.trim());
    setContentType(contentType.trim());
    setMarkStage(markStage.trim());
    setRecommendationType(recommendationType.trim());
    setRecommendationReason(recommendationReason.trim());
    const author = localStorage.getItem("loggedInUser");
    const authorId = author ? Number(author) : null;
    const postToDb = async () => {
      try {
        setOpenAlert(false);
        await axios
          .post(`${baseUrl}/resources`, {
            name: resourceName,
            author_id: authorId,
            description: description,
            url: url,
            content_type: contentType,
            mark_stage: markStage,
            recommendation_type: recommendationType,
            recommendation_reason: recommendationReason,
          })
          .then((res) => setOpenSubmit(true));
        delay(3000).then(() => setOpenSubmit(false));
        setResourceName(" ");
        setDescription(" ");
        setUrl(" ");
        setContentType(" ");
        setMarkStage(" ");
        setRecommendationType(" ");
        setRecommendationReason(" ");
      } catch (error) {
        console.error(error);
      }
    };
    return authorId &&
      resourceName.trim() &&
      url.trim() &&
      contentType.trim() &&
      markStage.trim() &&
      recommendationType.trim()
      ? postToDb()
      : (setOpenAlert(true), delay(3000).then(() => setOpenAlert(false)));
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ pt: 2 }} component="div">
        Create new resource
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {resourceName ? (
              <TextField
                name="resourceName"
                required
                fullWidth
                id="resourceName"
                value={resourceName.trim()}
                onChange={(e) => setResourceName(e.target.value.trim())}
                label="Resource Name"
                autoFocus
              />
            ) : (
              <TextField
                error
                name="resourceName"
                required
                fullWidth
                id="resourceName"
                value={resourceName.trim()}
                onChange={(e) => setResourceName(e.target.value.trim())}
                label="Resource Name"
                autoFocus
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="resourceDescription"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description.trim()}
              onChange={(e) => setDescription(e.target.value.trim())}
              placeholder="Please enter a description for the resource"
            />
          </Grid>
          <Grid item xs={12}>
            {url ? (
              <TextField
                name="resourceURL"
                required
                fullWidth
                id="resourceURL"
                label="Resource URL"
                value={url.trim()}
                onChange={(e) => setUrl(e.target.value.trim())}
              />
            ) : (
              <TextField
                error
                name="resourceURL"
                required
                fullWidth
                id="resourceURL"
                label="Resource URL"
                value={url.trim()}
                onChange={(e) => setUrl(e.target.value.trim())}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel id="content_type">Content Type</InputLabel>
              {contentType ? (
                <Select
                  labelId="content_type"
                  id="select_content_type"
                  required
                  value={contentType.trim()}
                  onChange={(e) => setContentType(e.target.value.trim())}
                  label="Age"
                >
                  {content_type.map((el, i) => {
                    return (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <Select
                  error
                  labelId="content_type"
                  id="select_content_type"
                  required
                  value={contentType.trim()}
                  onChange={(e) => setContentType(e.target.value.trim())}
                  label="Age"
                >
                  {content_type.map((el, i) => {
                    return (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel id="mark_stage">Select Mark Stage</InputLabel>
              {markStage ? (
                <Select
                  labelId="mark_stage"
                  id="select_mark_stage"
                  required
                  value={markStage.trim()}
                  onChange={(e) => setMarkStage(e.target.value.trim())}
                  label="Mark Stage"
                >
                  {mark_stage.map((el, i) => {
                    return (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <Select
                  error
                  labelId="mark_stage"
                  id="select_mark_stage"
                  required
                  value={markStage.trim()}
                  onChange={(e) => setMarkStage(e.target.value.trim())}
                  label="Mark Stage"
                >
                  {mark_stage.map((el, i) => {
                    return (
                      <MenuItem key={i} value={el}>
                        {el}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {recommendationType ? (
              <FormControl required component="fieldset">
                <FormLabel component="legend">Recommendation Type</FormLabel>
                <RadioGroup
                  aria-label="recommendation_type"
                  name="recommendation_type"
                  onChange={(e) => setRecommendationType(e.target.value.trim())}
                >
                  {recommendation_type.map((el, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={el}
                        control={<Radio />}
                        label={el}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl error required component="fieldset">
                <FormLabel component="legend">Recommendation Type</FormLabel>
                <RadioGroup
                  aria-label="recommendation_type"
                  name="recommendation_type"
                  onChange={(e) => setRecommendationType(e.target.value.trim())}
                >
                  {recommendation_type.map((el, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={el}
                        control={<Radio />}
                        label={el}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="recommendationReason"
              label="Reason for recommendation"
              multiline
              rows={2}
              fullWidth
              placeholder="Please enter a reason for the recommendation"
              onChange={(e) => setRecommendationReason(e.target.value.trim())}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Resource
        </Button>
        {openAlert && (
          <Alert severity="error">Please complete all required fields</Alert>
        )}
        {openSubmit && (
          <Alert severity="success">Resource successfully submitted</Alert>
        )}
      </Box>
    </Container>
  );
}
