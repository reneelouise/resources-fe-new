import { useState, useEffect } from "react";
import axios from "axios";

interface Tags {
  tag_id: number;
  name: string;
  times_used?: number;
}

const Search = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

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
            <h2>Searched terms: {keyword}</h2>
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
            <>
              <div id="tags" key={tag.tag_id}>
                <button onClick={() => setKeyword(tag.name)}>{tag.name}</button>
              </div>
            </>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Search;
