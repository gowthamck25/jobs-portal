import { useSelector } from "react-redux";
import styled from "styled-components";
import JobCard from "./JobCard";

const StyledJobsLayout = styled.div`
  display: grid;
  padding: 3.6rem 2.4rem;
  height: 100vh;
  overflow-y: scroll;
  grid-template-columns: 1fr 1fr 1fr;
`;

function JobsLayout() {
  const jobs = useSelector((store) => store.filter.filteredData);
  return (
    <StyledJobsLayout>
      {jobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </StyledJobsLayout>
  );
}

export default JobsLayout;
