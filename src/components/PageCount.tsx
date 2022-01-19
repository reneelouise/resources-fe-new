import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";


export default function PageCount(): JSX.Element {


   return (
      <Box sx={{
         minWidth: "300px",
         display: { xs: "flex" },
      }}>
         <Pagination count={10} variant="outlined" shape="rounded" />
      </Box>


   )
}