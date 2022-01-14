import { useState } from "react";
import axios from "axios";
import { BadRequestError } from "../utils/interfaces";
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
  Fab,
  Stack,
} from "@mui/material";

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

const tags = [
  "React",
  "Javascript",
  "Typescript",
  "MERN",
  "Express",
  "Git",
  "PERN",
  "CSS",
  "HTML",
  "Deploying",
  "Heroku",
  "Jest",
  "Testing",
  "Cypress",
  "Event Handlers",
  "useState",
  "useEffect",
  "Databases",
  "SQL",
  "Projects",
];

export default function CreateNewResource(): JSX.Element {
  const [resourceName, setResourceName] = useState<string>(" ");
  const [description, setDescription] = useState<string>(" ");
  const [url, setUrl] = useState<string>(" ");
  const [contentType, setContentType] = useState<string>(" ");
  const [markStage, setMarkStage] = useState<string>(" ");
  const [recommendationType, setRecommendationType] = useState<string>(" ");
  const [recommendationReason, setRecommendationReason] = useState<string>(" ");
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [submittedAlert, setSubmittedAlert] = useState<boolean>(false);
  const [alreadyExistsAlert, setAlreadyExistsAlert] = useState<boolean>(false);
  const [tagSelection, setTagSelection] = useState<string[]>([]);
  const [tagColour, setTagColour] = useState<
    ("inherit" | "default" | "primary" | "secondary" | undefined)[]
  >(Array(tags.length).fill("primary"));

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // eslint-disable-next-line
  const isBadRequestError = (x: any): x is BadRequestError => {
    return x.response.status === 400;
  };

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
        setErrorAlert(false);
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
            tags: tagSelection,
          })
          .then(() => setSubmittedAlert(true));
        delay(3000).then(() => setSubmittedAlert(false));
        setResourceName(" ");
        setDescription(" ");
        setUrl(" ");
        setContentType(" ");
        setMarkStage(" ");
        setRecommendationType(" ");
        setRecommendationReason(" ");
        setTagSelection([]);
        setTagColour(Array(tags.length).fill("primary"));
      } catch (error) {
        console.error(error);
        if (isBadRequestError(error)) {
          setAlreadyExistsAlert(true);
          delay(3000).then(() => setAlreadyExistsAlert(false));
        }
      }
    };
    return authorId &&
      resourceName.trim() &&
      url.trim() &&
      contentType.trim() &&
      markStage.trim() &&
      recommendationType.trim()
      ? postToDb()
      : (setErrorAlert(true), delay(3000).then(() => setErrorAlert(false)));
  };
  return (
    <Container className="create-new-resource" maxWidth="lg">
      <Typography variant="h4" py={3}>
        Create new resource
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {resourceName ? (
              <TextField
                className="resource-name-input"
                required
                fullWidth
                multiline
                rows={1}
                id="resourceName"
                value={resourceName}
                placeholder="Please enter a name for the resource"
                onChange={(e) => setResourceName(e.target.value)}
                label="Resource Name"
              />
            ) : (
              <TextField
                className="resource-name-input-error"
                error
                required
                fullWidth
                multiline
                rows={1}
                id="resourceName"
                placeholder="Please enter a name for the resource"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                label="Resource Name"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              className="resource-description-input"
              id="resourceDescription"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please enter a description for the resource"
            />
          </Grid>
          <Grid className="tag-buttons" item xs={12}>
            {tags.map((tag, i) => (
              <Fab
                key={i}
                variant="extended"
                size="small"
                color={tagColour[i]}
                aria-label="add"
                onClick={() =>
                  tagColour[i] === "primary"
                    ? (setTagSelection([...tagSelection, tag]),
                      (tagColour[i] = "secondary"),
                      setTagColour(tagColour))
                    : (setTagSelection(tagSelection.filter((el) => el !== tag)),
                      (tagColour[i] = "primary"),
                      setTagColour(tagColour))
                }
              >
                {tag}
              </Fab>
            ))}
          </Grid>
          <Grid item xs={12}>
            {url ? (
              <TextField
                className="resource-url-input"
                required
                fullWidth
                multiline
                rows={1}
                id="resourceURL"
                label="Resource URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            ) : (
              <TextField
                className="resource-url-input-error"
                error
                required
                fullWidth
                multiline
                rows={1}
                id="resourceURL"
                label="Resource URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl className="resource-type-form" required fullWidth>
              <InputLabel id="content_type">Content Type</InputLabel>
              {contentType ? (
                <Select
                  className="resource-type-selector"
                  labelId="content_type"
                  id="select_content_type"
                  required
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  label="resource-type"
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
                  className="resource-type-selector-error"
                  error
                  labelId="content_type"
                  id="select_content_type"
                  required
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  label="resource-type"
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
            <FormControl className="mark-stage-form" required fullWidth>
              <InputLabel id="mark_stage">Select Mark Stage</InputLabel>
              {markStage ? (
                <Select
                  className="mark-stage-selector"
                  labelId="mark_stage"
                  id="select_mark_stage"
                  required
                  value={markStage}
                  onChange={(e) => setMarkStage(e.target.value)}
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
                  className="mark-stage-selector-error"
                  error
                  labelId="mark_stage"
                  id="select_mark_stage"
                  required
                  value={markStage}
                  onChange={(e) => setMarkStage(e.target.value)}
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
              <FormControl
                className="recommendation-type"
                required
                component="fieldset"
              >
                <FormLabel component="legend">Recommendation Type</FormLabel>
                <RadioGroup
                  className="recommendation-type-radio"
                  aria-label="recommendation_type"
                  name="recommendation_type"
                  onChange={(e) => setRecommendationType(e.target.value)}
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
              <FormControl
                className="recommendation-type-error"
                error
                required
                component="fieldset"
              >
                <FormLabel component="legend">Recommendation Type</FormLabel>
                <RadioGroup
                  className="recommendation-type-radio-error"
                  aria-label="recommendation_type"
                  name="recommendation_type"
                  onChange={(e) => setRecommendationType(e.target.value)}
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
              className="recommendation-reason"
              id="recommendationReason"
              label="Reason for recommendation"
              multiline
              rows={2}
              fullWidth
              placeholder="Please enter a reason for the recommendation"
              onChange={(e) => setRecommendationReason(e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box sx={{ padding: "6px 12px 0 0" }}>
              {errorAlert && (
                <Alert className="alert-error" severity="error">
                  Please complete all required fields
                </Alert>
              )}
              {submittedAlert && (
                <Alert className="alert-submitted" severity="success">
                  Resource successfully submitted
                </Alert>
              )}
              {alreadyExistsAlert && (
                <Alert className="alert-already-exists" severity="error">
                  Resource already exists
                </Alert>
              )}
            </Box>
            <Button
              className="submit-button"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Resource
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
