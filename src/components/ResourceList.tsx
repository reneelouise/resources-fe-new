import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ResourceCard from "./ResourceCard";
import { IResource } from "../utils/interfaces";
import { UserContext } from "../contexts/UserContext";

interface ResourceListProps {
  searchTerm: string;
}

export default function ResourceList(props: ResourceListProps): JSX.Element {
  const { userId } = useContext(UserContext);
  const { searchTerm } = props;
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetchValue, setRefetchValue] = useState<number>(1);
  const [itemsInStudyList, setItemsInStudyList] = useState<number[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${baseUrl}/resources`);
        setResources(res.data.data);

        if (userId) {
          const studylist = await axios.get(
            `${baseUrl}/users/${userId}/study_list`
          );

          setItemsInStudyList(
            studylist.data.data.map((resource: IResource) => resource.id)
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchResources();
  }, [refetchValue, searchTerm, userId]);

  const filteredResources = resources
    .filter((resource) => {
      if (searchTerm) {
        const lowercaseSearch = searchTerm.toLowerCase();
        return (
          resource.resource_name?.toLowerCase().includes(lowercaseSearch) ||
          resource.content_type?.toLowerCase().includes(lowercaseSearch) ||
          resource.user_name?.toLowerCase().includes(lowercaseSearch) ||
          resource.description?.toLowerCase().includes(lowercaseSearch) ||
          resource.tags?.toLowerCase().includes(lowercaseSearch)
        );
      } else {
        return resource;
      }
    })
    .map((resource) => (
      <div key={resource.id}>
        <ResourceCard
          isOnStudyList={itemsInStudyList.includes(resource.id)}
          resource={resource}
          refetchValue={refetchValue}
          toggleRefetch={setRefetchValue}
        />
      </div>
    ));

  return <Box>{filteredResources}</Box>;
}
