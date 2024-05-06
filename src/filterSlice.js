import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  initialData: [],
  filteredData: [],
  roles: [],
  locations: [],
  status: "idle",
};

// Fetch jobs data using Async Thunk
export const fetchData = createAsyncThunk(
  "filter/fetchData",
  async function () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 947,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const res = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );

    if (!res) console.error(res.error);

    const data = res.text();

    return data;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Populate state.roles with unique roles
    setRoles(state, action) {
      state.roles = action.payload;
    },
    // Populate state.locations with unique locations
    setLocations(state, action) {
      state.locations = action.payload;
    },
    // Populate state.filteredData with data dispatched from Filters.jsx
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },
  },
  // Logic to handle Promise from Redux Thunk
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        // Unpack jobs list into array and update store
        const jobsData = JSON.parse(action.payload);
        const unpackedJobsData = [...jobsData.jdList];

        state.data = unpackedJobsData;
        state.initialData = unpackedJobsData;
        state.status = "idle";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = "There was a problem getting data";
      }),
});

export default filterSlice.reducer;
export const { setRoles, setLocations, setFilteredData } = filterSlice.actions;
