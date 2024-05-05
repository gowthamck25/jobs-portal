import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  status: "idle",
  roles: [],
  emplyeesRange: [],
  experience: "",
  remote: [],
  minBaseSalary: "",
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
    setData(state, action) {
      //   console.log(state);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = JSON.parse(action.payload);
        state.status = "idle";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = "There was a problem getting data";
      }),
});

export default filterSlice.reducer;
export const { setData, filterRole } = filterSlice.actions;
