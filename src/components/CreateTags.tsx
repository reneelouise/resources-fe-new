import { Grid, TextField, Button, Chip } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { tags } from "../utils/constantsForNewForm";
import { ITag } from "../utils/interfaces";

interface CreateTagProps {
  tagSelection: string[];
  setTagSelection: React.Dispatch<React.SetStateAction<string[]>>;
  tagColour: (
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined
  )[];
  setTagColour: React.Dispatch<
    React.SetStateAction<
      (
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
        | undefined
      )[]
    >
  >;
}

export default function CreateTags(props: CreateTagProps): JSX.Element {
  const { tagSelection, setTagSelection, tagColour, setTagColour } = props;
  const [newTag, setNewTag] = useState<string>("");
  const [tags, setTags] = useState<ITag[]>([]);

  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${baseUrl}/tags`);
        setTags(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, [newTag]);

  useEffect(() => {
    setTagColour([...tagColour, "secondary"]);
  }, [newTag]);

  const submitTag = async () => {
    try {
      await axios.post(`${baseUrl}/tags`, {
        tagName: newTag,
      });
    } catch (error) {
      console.error(error);
    }
    setNewTag("");
    setTagSelection([...tagSelection, newTag]);
  };
  console.log(tagSelection);

  return (
    <>
      <Grid className="tag-buttons" item xs={12}>
        <TextField
          className="tag-field"
          multiline
          id="text-field-for-tags"
          label="Enter a new tag"
          onChange={(e) => setNewTag(e.target.value)}
          value={newTag}
          InputLabelProps={{ shrink: true }}
          placeholder="Enter tags here"
          InputProps={{
            endAdornment: <Button onClick={submitTag}>Submit</Button>,
          }}
        />
      </Grid>

      <Grid className="tag-buttons" item xs={12}>
        <TextField
          className="tag-field"
          multiline
          id="text-field-for-tags"
          label="Tags"
          disabled
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <Box className="tag-chips" sx={{ minWidth: "400px" }}>
                {tags.map((tag, i) => {
                  return (
                    <Chip
                      className="tag-chips"
                      key={i + 1}
                      id="tag"
                      sx={{ margin: "0.1rem" }}
                      clickable={true}
                      color={tagColour[i]}
                      label={tag.name}
                      onClick={() =>
                        tagColour[i] === "primary"
                          ? (setTagSelection([...tagSelection, tag.name]),
                            (tagColour[i] = "secondary"),
                            setTagColour(tagColour))
                          : (setTagSelection(
                              tagSelection.filter((el) => el !== tag.name)
                            ),
                            (tagColour[i] = "primary"),
                            setTagColour(tagColour))
                      }
                    />
                  );
                })}
              </Box>
            ),
          }}
        />
      </Grid>
    </>
  );
}
