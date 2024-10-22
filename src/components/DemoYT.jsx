import { useState } from "react";
import { youtubeSearchQueryApi } from "../articles/Youtube/youtubeSearchQueryApi";
import Display from "./Display";
// import History from "./History";
import { FormYT } from "./subComponents";
import {
  analyzeHotVideos,
  analyzeTrendingVideos,
} from "../utils/filterRawDataForValidVideoContent";
import { analyzeChannels } from "../utils/filterRawDataForValidChannelContent";
import { extractTitleAndDescription } from "../utils/extractData";
import { youtubeTitleAndDescSummary } from "../articles/Youtube/youtubeTitleAndDescSummary";

const DemoYT = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    type: "video", // | "channel"
    sortByTime: "month", // | "day" | "week" | "month" | "year"
    location: "",
    locationRadius: "",
    whatsNew: "trending", // | hot
  });
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  let titleAndDescription;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);

    try {
      const response = await youtubeSearchQueryApi(query);
      console.log("response from youtubeSearchQueryApi", response);
      let videoContentArray = [];

      if (query.type === "video") {
        if (query.whatsNew === "hot") {
          videoContentArray = await analyzeHotVideos(response);
        } else if (query.whatsNew === "trending") {
          videoContentArray = await analyzeTrendingVideos(response);
        }
        titleAndDescription = extractTitleAndDescription(
          videoContentArray.map(({ video }) => video.snippet)
        );
        setSummary(titleAndDescription);
      } else if (query.type === "channel") {
        videoContentArray = await analyzeChannels(response);
        titleAndDescription = extractTitleAndDescription(
          videoContentArray.map(({ channel }) => channel.snippet)
        );
        setSummary(titleAndDescription);
      } else {
        throw new Error("Invalid query type");
      }

      console.log("MainContentArray", videoContentArray);
      setData(videoContentArray);
      setIsFetching(false);

      await youtubeTitleAndDescSummary(titleAndDescription, setSummary);
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
        summary={summary}
      />
    </section>
  );
};

export default DemoYT;
