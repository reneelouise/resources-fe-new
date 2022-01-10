import { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";

interface Tags {
  name: string;
  times_used?: number;
}

const Search = (): JSX.Element => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchTags = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tags/popular`);
      setTags(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const searchTagClick = () => {

  // }

  useEffect(() => {
    // console.log('useEffect is firing')
    fetchTags();
  }, []);

  // const tagClickHandler = (tag_id) => {
  //   if(tag_id)
  // }

  return (
    <>
      <div id="search-container">
        <div id="search-form">
          <form>
            <input
              id="search"
              value={keyword}
              type="text"
              placeholder="Search for resources"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button id="search-btn">Search</button>
          </form>
        </div>
        {tags.map((tag) => {
          return (
            <div id="tags" key={tag.name}>
              {/* <button onClick={() => setKeyword(tag.name)}>{tag.name}</button> */}
              <Chip
                color="success"
                clickable={true}
                label={tag.name}
                onClick={() => setKeyword(tag.name)}
              />
            </div>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Search;
