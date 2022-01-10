import axios from "axios";
import { useState, useEffect } from "react";
import { Resource } from "./Resource";
import { IResource } from "../utils/interfaces";
import PopularResources from "../components/PopularResources";
import Search from "../components/Search";

const ResourceList = (): JSX.Element => {
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetch, setRefetch] = useState<number>(1);

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${baseUrl}/resources`);
      setResources(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [refetch]);

  return (
    <>
      <Search />
      <PopularResources />
      {resources.map((resource) => (
        <div key={resource.id}>
          <Resource {...resource} setRefetch={setRefetch} />
        </div>
      ))}
    </>
  );
};

export default ResourceList;
