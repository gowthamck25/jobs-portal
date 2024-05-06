import styled from "styled-components";
import Img from "./ui/Img";

const StyledJobCard = styled.div`
  padding: 24px;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);
`;

const LogoBox = styled.div`
  display: flex;
  gap: 20px;
`;

const CompanyName = styled.p`
  font-size: 20px;
  color: #999;
  font-weight: 600;
`;

const Role = styled.p`
  font-size: 15px;
  color: #666;
`;

const Location = styled.p`
  font-size: 12px;
  color: #555;
`;

const SalaryBox = styled.p`
  font-size: 15px;
  color: #888;
  margin-top: 10px;
`;

const AboutHeading = styled.p`
  font-size: 20px;
  color: #555;
  margin-top: 20px;
`;

const AboutSubHeading = styled.p`
  font-size: 15px;
  color: #444;
  font-weight: 600;
`;

const JobDescription = styled.p`
  font-size: 15px;
  color: #777;
  margin-top: 10px;
`;

const JDLink = styled.a`
  color: #4263eb;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    color: #3b5bdb;
  }
`;

const ExperienceHeading = styled.p`
  margin-top: 10px;
  color: #999;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.75px;
`;

const Experince = styled.p`
  color: #555;
  font-size: 13px;
`;

function JobCard({ job }) {
  const {
    jdUid: id,
    jdLink: jobLink,
    jobDetailsFromCompany: details,
    maxJdSalary: maxSalary,
    minJdSalary: minSalary,
    salaryCurrencyCode,
    location,
    minExp,
    maxExp,
    jobRole,
    companyName,
    logoUrl,
  } = job;

  const role = jobRole
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const jobLocation = location
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <StyledJobCard>
      <LogoBox>
        <Img src={logoUrl} alt={details} />
        <div>
          <CompanyName>{companyName}</CompanyName>
          <Role>{role}</Role>
          <Location>{jobLocation}</Location>
        </div>
      </LogoBox>

      {/* Handling NULL values based on whether minSalary or maxSalary  present */}
      <SalaryBox>
        {minSalary && maxSalary
          ? `Estimated Salary: ${salaryCurrencyCode} ${minSalary}L -  ${maxSalary}L`
          : minSalary && !maxSalary
          ? `Estimated Salary: ${salaryCurrencyCode} ${minSalary}L`
          : `Estimated Salary: ${salaryCurrencyCode} ${maxSalary}L`}
      </SalaryBox>

      <AboutHeading>About Company:</AboutHeading>
      <AboutSubHeading>About us:</AboutSubHeading>
      <JobDescription>{details}</JobDescription>
      <JDLink href={jobLink} target="_blank">
        {jobLink}
      </JDLink>

      {minExp && (
        <>
          {" "}
          <ExperienceHeading>Minimum Experience</ExperienceHeading>
          <Experince>{minExp} years</Experince>
        </>
      )}
    </StyledJobCard>
  );
}

export default JobCard;
