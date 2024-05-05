import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Filters from "./Filters";
import JobsLayout from "./JobsLayout";
import { fetchData } from "./filterSlice";

function AppLayout() {
  // const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchData());
    },
    [dispatch]
  );

  return (
    <>
      <Filters
      //  data={data}
      />
      <JobsLayout />
    </>
  );
}

export default AppLayout;
