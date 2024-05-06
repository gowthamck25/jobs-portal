import { useSelector } from "react-redux";
import styled from "styled-components";
import JobCard from "./JobCard";
import { Box, Alert } from "@mui/material";

const StyledJobsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3.6rem;

  padding: 3.6rem 2.4rem;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 1441px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 1025px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 426px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 376px) {
    padding: 20px;
  }

  @media (max-width: 321px) {
    padding: 14px;
  }
`;

function JobsLayout() {
  const jobs = useSelector((store) => store.filter.filteredData);

  if (jobs.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Alert variant="filled" severity="error">
          Oops no jobs found ☹️
        </Alert>
      </Box>
    );

  return (
    <StyledJobsLayout>
      {jobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </StyledJobsLayout>
  );
}

export default JobsLayout;
