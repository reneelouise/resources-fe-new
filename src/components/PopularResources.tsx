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

const PopularResources = (): JSX.Element => {
  const [popularResources, setPopularResources] = useState<IPopularResource[]>(
    []
  );

  const baseUrl = "https://bibliotech-project.herokuapp.com";

  const fetchPopularResources = async () => {
    const res = await axios.get(`${baseUrl}/resources/popular`);
    setPopularResources(res.data.data);
  };

  useEffect(() => {
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
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
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
                <TableCell>{resource.resource_name}</TableCell>
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
