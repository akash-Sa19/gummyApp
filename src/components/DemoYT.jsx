import { useState } from "react";
import { youtubeSearchQueryApi } from "../articles/Youtube/youtubeSearchQueryApi";
import Display from "./Display";
// import History from "./History";
import { FormYT } from "./subComponents";
import {
  analyzeHotVideos,
  analyzeTrendingVideos,
} from "../utils/filterRawDataForValidContent";

const DemoYT = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    type: "video", // | "channel"
    sortByTime: "week", // | "day" | "week" | "month" | "year"
    location: "",
    locationRadius: "",
    whatsNew: "trending", // | hot
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await youtubeSearchQueryApi(query);
      console.log("response from youtubeSearchQueryApi", response);

      let videoContentArray = [];
      if (query.whatsNew === "hot") {
        videoContentArray = await analyzeHotVideos(response);
      } else if (query.whatsNew === "trending") {
        videoContentArray = await analyzeTrendingVideos(response);
      }

      console.log("videoContentArray", videoContentArray);
      setData(videoContentArray);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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
      {/* <History /> */}
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
