import { useState, useEffect } from "react";
import { ITopContributor } from "../utils/interfaces";
import axios from "axios";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function PopularContributors(): JSX.Element {
  const [topContributors, setTopContributors] = useState<ITopContributor[]>([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchTopContributors = async () => {
      const res = await axios.get(`${baseUrl}/users/top_contributors`);
      setTopContributors(res.data.data);
    };
    fetchTopContributors();
  }, []);

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Typography variant="h5" my={2}>
        Top Contributors{" "}
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table
          sx={{ minWidth: "100%" }}
          size="small"
          aria-label="Most popular resources"
        >
          <caption>
            Avg. popularity = (likes - dislikes) / number of resources
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
