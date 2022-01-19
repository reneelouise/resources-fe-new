import { useState, useEffect } from "react";
import { IPopularResource } from "../utils/interfaces";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function PopularResources(): JSX.Element {
  const [popularResources, setPopularResources] = useState<IPopularResource[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchPopularResources = async () => {
      const res = await axios.get(`${baseUrl}/resources/popular`);
      setPopularResources(res.data.data);
    };
    fetchPopularResources();
    setTimeout(() => setIsLoading(false), 350);
  }, [isLoading]);

  const refreshTable = () => {
    setIsLoading(true);
  };

  function fetchUserInitials(userName: string) {
    let uppercasedInitials = "";
    userName
      .split(" ")
      .map((word) => (uppercasedInitials += word[0].toUpperCase()));
    return uppercasedInitials;
  }

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" my={2}>
          Most Popular Resources
        </Typography>
        <Box>
          <IconButton aria-label="refresh" onClick={refreshTable}>
            {!isLoading ? (
              <RefreshIcon color="primary" />
            ) : (
              <CircularProgress size={20} />
            )}
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table
          sx={{ minWidth: "100%" }}
          size="small"
          aria-label="Most popular resources"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Rank</TableCell>
              <TableCell align="left">Resource</TableCell>
              <TableCell align="left">Shared By</TableCell>
              <TableCell align="right">Popularity Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {popularResources.map((resource, i) => (
              <TableRow
                key={resource.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {resource.resource_name}
                </TableCell>
                <TableCell>{fetchUserInitials(resource.user_name)}</TableCell>
                <TableCell align="right">{resource.popularity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
