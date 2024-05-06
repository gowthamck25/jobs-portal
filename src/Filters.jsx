import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { setFilteredData, setLocations, setRoles } from "./filterSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  padding: 3rem;
`;

const experiences = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const minBaseSalaries = ["10L", "20L", "30L", "40L", "50L", "60L", "70L"];

function Filters() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get store data
  const jobsData = useSelector((store) => store.filter.data);
  const jobsInitialData = useSelector((store) => store.filter.initialData);
  const roles = useSelector((store) => store.filter.roles);
  const locations = useSelector((store) => store.filter.locations);

  // Get filter values from url parameters
  const rolesFilter = searchParams.get("roles");
  const experienceFilter = searchParams.get("experience");
  const mbspFilter = searchParams.get("mbsp");
  const locationFilter = searchParams.get("location");
  const companyNameFilter = searchParams.get("companyname");
  // console.log(rolesFilter, experienceFilter, mbspFilter, locationFilter);

  // Handle select onChange - set url parameters with values
  function handleRoleChange(e, value) {
    searchParams.set("roles", value);
    setSearchParams(searchParams);
  }

  function handleExperienceChange(e, value) {
    searchParams.set("experience", value);
    setSearchParams(searchParams);
  }

  function handleMBSPChange(e, value) {
    searchParams.set("mbsp", value);
    setSearchParams(searchParams);
  }

  function handleLocationChange(e, value) {
    searchParams.set("location", value);
    setSearchParams(searchParams);
  }

  function handleSearch(e) {
    searchParams.set("companyname", e.target.value);
    setSearchParams(searchParams);
  }

  // Logic to  filter data
  let filteredData = [];
  // Filter based on roles
  // console.log(rolesFilter, typeof rolesFilter);
  if (rolesFilter && rolesFilter !== "null" && rolesFilter.length > 0) {
    const roles = rolesFilter.split(",");
    for (let i = 0; i < roles.length; i++) {
      filteredData.push(
        ...jobsData.filter((item) => item.jobRole === roles[i]?.toLowerCase())
      );
    }
  } else filteredData = jobsData;
  // console.log(filteredData);

  // Filter based on experience
  if (
    experienceFilter &&
    experienceFilter !== "null" &&
    experienceFilter.length > 0
  ) {
    filteredData = filteredData.filter(
      (item) => item.minExp >= +experienceFilter
    );
  }

  // Filter based on Min Base Salary Pay
  if (mbspFilter && mbspFilter !== "null" && mbspFilter.length > 0) {
    filteredData = filteredData.filter(
      (item) => +item.minJdSalary >= parseInt(mbspFilter)
    );
  }

  // Filter based on location
  if (
    locationFilter &&
    locationFilter !== "null" &&
    locationFilter.length > 0
  ) {
    filteredData = filteredData.filter(
      (item) => item.location === locationFilter?.toLowerCase()
    );
  }

  if (companyNameFilter && companyNameFilter.length > 0) {
    filteredData = filteredData.filter((item) =>
      item.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())
    );
  }

  // Set filteredData in store
  // console.log(filteredData);
  dispatch(setFilteredData(filteredData));

  useEffect(
    function () {
      // Get unique roles from given data
      const uniqueRoles = new Set([
        ...jobsInitialData.map((jd) =>
          jd.jobRole
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
        ),
      ]);
      const jobRoles = Array.from(uniqueRoles);
      if (jobRoles) dispatch(setRoles(jobRoles));

      // Get unique companies from given data
      const uniqueLocations = new Set([
        ...jobsInitialData.map(
          (jd) => jd.location[0].toUpperCase() + jd.location.slice(1)
        ),
      ]);
      const locations = Array.from(uniqueLocations);
      if (locations) dispatch(setLocations(locations));
    },
    [dispatch, jobsInitialData]
  );

  return (
    <FilterBox>
      <Autocomplete
        disablePortal
        multiple
        id="combo-box-demo"
        options={roles}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
        onChange={(e, values) => handleRoleChange(e, values)}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={experiences}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label="Experience" />}
        onChange={(e, value) => handleExperienceChange(e, value)}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={minBaseSalaries}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Minimum Base Salary Pay" />
        )}
        onChange={(e, value) => handleMBSPChange(e, value)}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locations}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Location" />}
        onChange={(e, value) => handleLocationChange(e, value)}
      />
      <TextField
        id="outlined-basic"
        label="Search Company Name"
        variant="outlined"
        onChange={(e, value) => handleSearch(e, value)}
      />
    </FilterBox>
  );
}

export default Filters;
