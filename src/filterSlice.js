import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  initialData: [],
  filteredData: [],
  roles: [],
  locations: [],
  status: "idle",
};

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
    // console.log(data);
    return data;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload;
    },
    setLocations(state, action) {
      state.locations = action.payload;
    },
    setFilteredData(state, action) {
      // console.log(action.payload);
      state.filteredData = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const jobsData = JSON.parse(action.payload);
        const unpackedJobsData = [...jobsData.jdList];

        // console.log(unpackedJobsData);
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
