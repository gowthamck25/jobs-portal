// This is Presentational Component
import styled from "styled-components";

import Img from "./ui/Img";

const StyledJobCard = styled.div`
  padding: 24px;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);

  display: flex;
  flex-direction: column;
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

const JDBox = styled.div`
  position: relative;
`;

const JobDescription = styled.p`
  font-size: 15px;
  height: 275px;
  overflow: hidden;
  mask-image: linear-gradient(
    rgb(255, 255, 255),
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
  color: #777;
  margin-top: 10px;
`;

const JDLinkBox = styled.div`
  position: absolute;
  bottom: 1%;
  width: 100%;
  text-align: center;
`;

const JDLink = styled.a`
  color: #4943da;
  font-size: 15px;

  &:hover {
    cursor: pointer;
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
const ButtonBox = styled.div`
  margin-top: auto;
`;
const EasyApplyButton = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-lg);
  height: 50px;
  width: 100%;
  background-color: rgb(85, 239, 196);
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
  padding: 8px 18px;
  margin-top: 15px;
`;

const ReferralButton = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-lg);
  height: 50px;
  width: 100%;
  background-color: #4943da;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding: 8px 18px;
  margin-top: 15px;
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
          ? `Estimated Salary: ${salaryCurrencyCode} ${minSalary} -  ${maxSalary} LPA`
          : minSalary && !maxSalary
          ? `Estimated Salary: ${salaryCurrencyCode} ${minSalary} LPA`
          : `Estimated Salary: ${salaryCurrencyCode} ${maxSalary} LPA`}
      </SalaryBox>

      <AboutHeading>About Company:</AboutHeading>
      <AboutSubHeading>About us:</AboutSubHeading>
      <JDBox>
        <JobDescription>{details}</JobDescription>
        <JDLinkBox>
          <JDLink href={jobLink} target="_blank">
            View job
          </JDLink>
        </JDLinkBox>
      </JDBox>

      {minExp && (
        <>
          {" "}
          <ExperienceHeading>Minimum Experience</ExperienceHeading>
          <Experince>{minExp} years</Experince>
        </>
      )}

      <ButtonBox>
        <EasyApplyButton>⚡Easy Apply</EasyApplyButton>
        <ReferralButton>Unlock referral asks</ReferralButton>
      </ButtonBox>
    </StyledJobCard>
  );
}

export default JobCard;
