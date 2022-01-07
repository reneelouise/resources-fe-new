import axios from "axios";
import { useState, useEffect } from "react";
import { Resource } from "./Resource";
import { IResource } from "../utils/interfaces";

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

  const handleRefetch = () => {
    setRefetch((prev) => -prev);
  };

  useEffect(() => {
    fetchResources();
  }, [refetch]);

  return (
    <>
      {resources.map((resource) => (
        <div key={resource.id}>
          <Resource
            {...resource}
            // id={resource.id}
            // user_name={resource.author_id}
            // is_faculty={resource.is_faculty}
            // resource_name={resource.name}
            // description={resource.description}
            // url={resource.url}
            // content_type={resource.content_type}
            // mark_stage={resource.mark_stage}
            // created_at={resource.created_at}
            // recommendation_type={resource.recommendation_reason}
            // recommendation_reason={resource.recommendation_reason}
            // count_of_likes={resource.count_of_likes}
            // count_of_dislikes={resource.count_of_dislikes}
            // number_of_comments={resource.number_of_comments}
            // tags={resource.tags}
            handleRefetch={handleRefetch}
          />
        </div>
      ))}
    </>
  );
};

export default ResourceList;
