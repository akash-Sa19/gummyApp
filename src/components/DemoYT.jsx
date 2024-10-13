import { useState } from "react";
import { youtubeQueryApi } from "../articles/Youtube/youtubeQueryApi";
import Display from "./Display";
import History from "./History";
import FormYT from "./subComponents/FormYT";

const DemoYT = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    orderBy: "relevance",
    maxResult: 10,
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await youtubeQueryApi(query, setIsFetching);
      setData(response);

      console.log("Demo/line:23 -> ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full mt-4">
      {/* search */}
      <FormYT
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <History />
      <Display
        isFetching={isFetching}
        // error={true}
        data={data}
        platform={platform}
      />
    </section>
  );
};

export default DemoYT;
