import { Box, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";

import JobCard from "./JobCard";

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

  // When there is no jobs found based on filter then display "No jobs found"
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

  // When jobs are available display JOB CARDS
  return (
    <StyledJobsLayout>
      {jobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </StyledJobsLayout>
  );
}

export default JobsLayout;
