import React, { useState } from "react";
import { getScrapedData } from "../articles/Reddit/redditQueryApi";
import FormRE from "./subComponents/FormRE";
import Display from "./Display";

const DemoRE = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    orderBy: "all", //filterBy ->  "last hour" | "day" | "week" | "month" | "year"
    searchType: "Posts", // "posts" | "communities" | "users"
    maxResult: 50,
    sortBy: "relevance", // "hot" | "top" | "new"
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await getScrapedData(query, setIsFetching);
      setData(response.data);
      console.log("DemoRE/line:21 ->", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mt-4">
      {/* search */}
      <FormRE
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <Display
        isFetching={isFetching}
        data={data}
        platform={platform}
      />
    </div>
  );
};

export default DemoRE;
