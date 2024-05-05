import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";

const FilterBox = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 3rem;
`;

const numEmployees = [
  "1-10",
  "11-20",
  "21-50",
  "51-100",
  "101-200",
  "201-500",
  "500+",
];

const experiences = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const remote = ["Remote", "Hybrid", "In-Office"];

const minBaseSalaries = ["0L", "10L", "20L", "30L", "40L", "50L", "60L", "70L"];

function Filters({ data }) {
  let roles = [];
  const currentData = data?.jdList;
  if (currentData) {
    const array = [...currentData];

    const uniqueRoles = new Set([
      ...array.map((jd) =>
        jd.jobRole
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")
      ),
    ]);
    roles = Array.from(uniqueRoles);
  }

  return (
    <FilterBox>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={roles}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={numEmployees}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Number Of Employees" />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={experiences}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label="Experience" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={remote}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label="Remote" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={minBaseSalaries}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Minimum Base Salary Pay" />
        )}
      />
    </FilterBox>
  );
}

export default Filters;
