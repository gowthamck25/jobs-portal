import { useEffect, useState } from "react";
import Filters from "./Filters";
import JobsLayout from "./JobsLayout";

function AppLayout() {
  const [data, setData] = useState();
  useEffect(function () {
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

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(JSON.parse(result));
        setData(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Filters data={data} />
      <JobsLayout />
    </>
  );
}

export default AppLayout;
