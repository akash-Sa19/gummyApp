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
    orderBy: "", // "relevance" | "date" | "rating" | "viewCount" | "likeCount"
    type: "", // "video" | "playlist" | "channel"
    eventType: "", // "live" | "upcoming" | "completed"
    maxResult: 10,
    publishedAfter: "",
    publishedBefore: "",
    location: "",
    locationRadius: "",
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await youtubeSearchQueryApi(query, setIsFetching);
      console.log("response from youtubeSearchQueryApi", response);
      const videoContentArray = await analyzeTrendingVideos(response);
      console.log("data from analyzeTrendingVideos", videoContentArray);
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
