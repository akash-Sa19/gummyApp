import { useState } from "react";
import { getScrapedData } from "../articles/Reddit/redditQueryApi";
import { FormRE } from "./subComponents";
import Display from "./Display";

const DemoRE = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    orderBy: "all", // "all" | "hour" | "day" | "week" | "month" | "year"
    searchType: "posts", // "posts" | "communities" | "users"
    sortBy: "relevance", // "hot" | "top" | "new"
    maxResult: 50,
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
