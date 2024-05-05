import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";

const FilterBox = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 3rem;

  font-size: 5rem !important;
`;

// const Option = styled.option`
//   font-size: 1.4rem;
// `;

// const StyledInput = styled(TextField)`
//   & .MuiInputBase-input {
//     font-size: 1.4rem;
//   }
// `;

function Filters() {
  const roles = ["Backend", "Frontend", "Fullstack", "IOS"];
  return (
    <FilterBox>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={roles}
        sx={{ width: 200, fontSize: "16px" }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
        // renderOption={(params, roles) => (
        //   <Option {...params} key={roles}>
        //     {roles}
        //   </Option>
        // )}
      />
    </FilterBox>
  );
}

export default Filters;
