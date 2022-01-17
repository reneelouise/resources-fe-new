import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import ResourceCard from "./ResourceCard";
import { IResource } from "../utils/interfaces";
import { UserContext } from "../contexts/UserContext";

interface ResourceListProps {
  searchTerm: string;
  tagSelection: string[];
}

export default function ResourceList(props: ResourceListProps): JSX.Element {
  const { userId, itemsInStudyList } = useContext(UserContext);
  const { searchTerm, tagSelection } = props;
  const [resources, setResources] = useState<IResource[]>([]);
  const [refetchResources, setRefetchResources] = useState<number>(1);

  const toggleRefetchResources = () => {
    setRefetchResources((prev) => -prev);
  };

  useEffect(() => {
    const fetchResources = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${baseUrl}/resources`);
        setResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResources();
  }, [searchTerm, userId, itemsInStudyList, refetchResources]);

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
      } else if (tagSelection.length) {
        return (
          resource.tags &&
          resource.tags.split(", ").filter((tag) => tagSelection.includes(tag))
            .length
        );
      } else {
        return resource;
      }
    })
    .map((resource) => (
      <div key={resource.id}>
        <ResourceCard
          resource={resource}
          toggleRefetchResources={toggleRefetchResources}
        />
      </div>
    ));

  return (
    <>
      <Box
        component="div"
        py={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Browse Resources</Typography>
        <Typography variant="caption" color="#616161">
          Showing {filteredResources.length} of {resources.length} resources
        </Typography>
      </Box>
      <Box>{filteredResources}</Box>
    </>
  );
}
