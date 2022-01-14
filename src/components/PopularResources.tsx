import { useState, useEffect } from "react";
import { IPopularResource } from "../utils/interfaces";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const PopularResources = (): JSX.Element => {
  const [popularResources, setPopularResources] = useState<IPopularResource[]>(
    []
  );

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchPopularResources = async () => {
      const res = await axios.get(`${baseUrl}/resources/popular`);
      setPopularResources(res.data.data);
    };
    fetchPopularResources();
  }, []);

  function fetchUserInitials(userName: string) {
    let uppercasedInitials = "";
    userName
      .split(" ")
      .map((word) => (uppercasedInitials += word[0].toUpperCase()));
    return uppercasedInitials;
  }

  return (
    <Container>
      <Typography variant="h5" my={2}>
        Most Popular Resources
      </Typography>
      <TableContainer component={Paper}>
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
              <TableCell align="right">Score</TableCell>
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
};

export default PopularResources;
