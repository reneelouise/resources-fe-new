import { useState, useEffect } from "react";
import { ITopContributor } from "../utils/interfaces";
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

export default function PopularContributors(): JSX.Element {
  const [topContributors, setTopContributors] = useState<ITopContributor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchTopContributors = async () => {
      const res = await axios.get(`${baseUrl}/users/top_contributors`);
      setTopContributors(res.data.data);
    };
    fetchTopContributors();
    setTimeout(() => setIsLoading(false), 350);
  }, [isLoading]);

  const refreshTable = () => {
    setIsLoading(true);
  };

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" my={2}>
          Top Contributors
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
          <caption>
            Avg. Popularity = (Likes - Dislikes) / Number of Resources
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="left">Rank</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="right">Resources Shared</TableCell>
              <TableCell align="right">Avg. Popularity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topContributors.map((contributor, i) => (
              <TableRow
                key={contributor.user_id}
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
                  {contributor.user_name}
                </TableCell>
                <TableCell align="right">
                  {contributor.resources_contributed}
                </TableCell>
                <TableCell align="right">
                  {contributor.avg_popularity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
