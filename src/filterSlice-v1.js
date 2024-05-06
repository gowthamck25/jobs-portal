import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  initialData: [],
  filteredData: [],
  isFilterOn: false,
  status: "idle",
  isRoleFilterOn: false,
  isExperienceFileterOn: false,
  isBaseSalaryFilterOn: false,

  //   roles: [],
  //   emplyeesRange: [],
  //   experience: "",
  //   remote: [],
  //   minBaseSalary: "",
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
    // onRoleChange(state, action) {
    //   // Use current role input values along with jobs inital data to compute the role filtered data
    //   const { values, jobsInitialData } = action.payload;
    //   const roleBasedData = [];
    //   //   console.log(values, jobsInitialData);
    //   for (let i = 0; i < values.length; i++) {
    //     roleBasedData.push(
    //       ...jobsInitialData.filter(
    //         (item) => item.jobRole === values[i].toLowerCase()
    //       )
    //     );
    //   }
    //   //   console.log(roleBasedData);
    //   if (values.length > 0) state.data = roleBasedData;
    //   else state.data = jobsInitialData;
    // },
    // onExperienceChange(state, action) {
    //   const { value, jobsData } = action.payload;
    //   if (!value) {
    //     state.data = jobsData;
    //     state.filteredData = jobsData;
    //     return;
    //   }
    //   const expFilterData = [
    //     ...jobsData.filter((item) => +value <= item.minExp),
    //   ];
    //   state.data = expFilterData;
    //   state.filteredData = expFilterData;
    // },
    // onBaseSalaryChange(state, action) {},
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
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
export const { onRoleChange, onExperienceChange, filterRole } =
  filterSlice.actions;
