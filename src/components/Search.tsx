import { useState, useEffect } from "react";
import axios from "axios";


interface Tags {
  tag_id?: number;
  name: string;
  times_used?: number;
}

const Search = () => {

  const [tags, setTags] = useState<Tags[]>([])

  const baseUrl = 'https://bibliotech-project.herokuapp.com'

  const fetchTags = async () => {
    try {
      const res = await axios.get(`${baseUrl}/tags/popular`)
      setTags(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log('useEffect is firing')
    fetchTags();
  }, []);



  return (

    <>
    <div id="search-container">
<div id="search-form">
      <form >
        <input id="search" type="text" placeholder="Search for resources" />
        <button id="search-btn">Search</button>
      </form>
      </div>




      {tags.map((tag) => {
        return (
          <>
            <div id="tags" key={tag.tag_id}>
              <button>{tag.name}</button>
            </div>
          </>
        )
      })} </div></>)







};

export default Search;
