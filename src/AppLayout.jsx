import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Filters from "./Filters";
import JobsLayout from "./JobsLayout";
import { fetchData } from "./filterSlice";

function AppLayout() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(fetchData());
    },
    [dispatch]
  );

  return (
    <>
      <Filters />
      <JobsLayout />
    </>
  );
}

export default AppLayout;
