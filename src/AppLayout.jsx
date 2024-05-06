import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filters from "./Filters";
import JobsLayout from "./JobsLayout";
import { fetchData } from "./filterSlice";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((store) => store.filter.data);

  useEffect(
    function () {
      navigate("/searchjobs");
    },
    [navigate]
  );

  useEffect(
    function () {
      dispatch(fetchData());
    },
    [dispatch]
  );

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

  return (
    <>
      <Filters />
      <JobsLayout />
    </>
  );
}

export default AppLayout;
