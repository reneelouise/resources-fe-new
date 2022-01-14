import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
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
import { getInitialsFromName } from "../utils/getInitialsFromName";

export default function YourSubmittedResources(): JSX.Element {
  const { userId } = useContext(UserContext);
  const [listOfResourcesSubmitted, setListOfResourcesSubmitted] = useState<
    IPopularResource[]
  >([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    if (userId) {
      const fetchSubmittedResources = async () => {
        const res = await axios.get(
          `${baseUrl}/users/${userId}/your_submitted_resources`
        );
        setListOfResourcesSubmitted(res.data.data);
      };
      fetchSubmittedResources();
    }
  }, [userId]);

  return (
    <Container>
      <Typography variant="h5" my={2}>
        Your Submitted Resources
      </Typography>
      {listOfResourcesSubmitted.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "100%" }}
            size="small"
            aria-label="most popular resources"
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
              {listOfResourcesSubmitted.map((resource, i) => (
                <TableRow
                  key={resource.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{resource.resource_name}</TableCell>
                  <TableCell>
                    {getInitialsFromName(resource.user_name)}
                  </TableCell>
                  <TableCell align="right">{resource.popularity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">
          You haven't submitted any resources!
        </Typography>
      )}
    </Container>
  );
}
