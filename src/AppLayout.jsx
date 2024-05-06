import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, CircularProgress } from "@mui/material";

import { fetchData } from "./filterSlice";
import Filters from "./Filters";
import JobsLayout from "./JobsLayout";

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.filter.data);

  // Clear all filters when page reloads
  useEffect(
    function () {
      navigate("/searchjobs");
    },
    [navigate]
  );

  // Fetch data when page reloads
  useEffect(
    function () {
      dispatch(fetchData());
    },
    [dispatch]
  );

  // When data is loading display Spinner
  if (data.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Alert variant="outlined" severity="info">
          Loading jobs data...
        </Alert>
        <CircularProgress />
      </Box>
    );

  // Display app once data has arriver
  return (
    <>
      <Filters />
      <JobsLayout />
    </>
  );
}

export default AppLayout;
