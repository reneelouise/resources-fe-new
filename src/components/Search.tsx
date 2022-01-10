import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
import { IResource } from "../utils/interfaces";

interface Tags {
  name: string;
  times_used?: number;
}

interface Props {
  resources: IResource[];
  setFilteredResults: (data: IResource[]) => void;
}

const Search = (props: Props): JSX.Element => {
  const { resources, setFilteredResults } = props;
  const [tags, setTags] = useState<Tags[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchTags = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tags/popular`);
      setTags(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchResources = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredResults(
      resources.filter((resource) => {
        return (
          resource.content_type?.includes(keyword) ||
          resource.user_name?.includes(keyword) ||
          resource.tags?.includes(keyword)
        );
      })
    );
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <>
      <div id="search-container">
        <div id="search-form">
          <form onSubmit={(e) => searchResources(e)}>
            <input
              id="search"
              value={keyword}
              type="text"
              placeholder="Search for resources"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" id="search-btn">
              Search
            </button>
          </form>
        </div>
        {tags.map((tag) => {
          return (
            <div id="tags" key={tag.name}>
              <Chip
                id="tag"
                color="success"
                clickable={true}
                label={tag.name}
                onClick={() => setKeyword(tag.name)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Search;
