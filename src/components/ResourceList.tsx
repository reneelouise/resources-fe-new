import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Link,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refetchResources, setRefetchResources] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [resourcesCount, setResourcesCount] = useState<number>(0);

  const count = Math.ceil(resourcesCount / itemsPerPage);

  const toggleRefetchResources = () => {
    setRefetchResources((prev) => -prev);
  };

  useEffect(() => {
    const fetchResourcesCount = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${baseUrl}/resources/count`);
        setResourcesCount(Number(res.data.data[0].count));
      } catch (error) {
        console.error(error);
      }
    };
    fetchResourcesCount();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchResources = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(
          `${baseUrl}/resources/${page}/${itemsPerPage}`
        );
        setResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResources();
    setTimeout(() => setIsLoading(false), 350);
  }, [
    page,
    itemsPerPage,
    searchTerm,
    userId,
    itemsInStudyList,
    refetchResources,
  ]);

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
          searchTerm={searchTerm}
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
          Showing {resources.length} of {resourcesCount} resources
        </Typography>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={10}>
          <CircularProgress size={40} />
        </Box>
      ) : filteredResources.length === 0 ? (
        <Box>
          <Typography variant="h6">
            There are no items that match your search.
          </Typography>
          <Typography variant="body1">
            Try searching by resource name, tags, description, author or content
            type
            {userId && (
              <>
                {" "}
                or <Link href="new">create a new resource</Link>.
              </>
            )}
          </Typography>
        </Box>
      ) : (
        <>
          <Box>{filteredResources}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "50px",
            }}
          >
            <Box></Box>
            <Pagination
              sx={{
                marginLeft: "40px",
              }}
              count={count}
              size="large"
              page={page}
              color="primary"
              onChange={(e, p) => {
                setPage(p);
              }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="resources-per-page">
                Resources per page
              </InputLabel>
              <Select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                label="Resources per page"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      )}
    </>
  );
}
