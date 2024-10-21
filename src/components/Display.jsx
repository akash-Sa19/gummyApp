import { loader } from "../assets";
import {
  filteredDateFromTrendingVideos,
  finalFilteredData,
  rawData,
  redditData,
} from "../constants/rawData.js";
import {
  Card,
  RedditCard,
  RedditCommunityCard,
  RedditUserCard,
  RedditCommentCard,
} from "./subComponents";
import YouTubeCard from "./subComponents/YouTubeCard.jsx";
import YoutubeChannelCard from "./subComponents/YouTubeChannelCard..jsx";

const Display = ({ isFetching, error, data, platform }) => {
  const dummyData = redditData;
  return (
    <div className="flex items-center justify-center w-full my-10">
      {isFetching ? (
        <img
          src={loader}
          alt="Loader"
          className="object-contain w-20 h-10"
        />
      ) : error ? (
        <p className="font-bold text-center text-black font-inter">
          Well, that wasn't suppose to happen...
          <br />
          <span className="font-normal text-gray-700 font-satoshi">
            {error?.data?.error}
          </span>
        </p>
      ) : (
        <div
          className={`flex flex-col w-full rounded-md ${
            platform === "YT" ? "gap-8" : "gap-2"
          }`}
        >
          {platform === "YT"
            ? data.map(({ video, kind, channel }, index) => {
                if (kind === "youtube#video") {
                  return (
                    <YouTubeCard
                      key={index}
                      snippet={video?.snippet}
                      statistics={video?.statistics}
                      id={video.id}
                    />
                  );
                } else if (kind === "youtube#channel") {
                  return (
                    <YoutubeChannelCard
                      key={index}
                      id={channel.id}
                      snippet={channel.snippet}
                      statistics={channel.statistics}
                    />
                  );
                }
              })
            : data.map((item, index) => {
                if (item.dataType == "post") {
                  return (
                    <RedditCard
                      key={index}
                      item={item}
                    />
                  );
                } else if (item.dataType == "comment") {
                  return (
                    <div
                      className="ml-20"
                      key={index}
                    >
                      <RedditCommentCard item={item} />
                    </div>
                  );
                } else if (item.dataType == "community") {
                  return (
                    <RedditCommunityCard
                      item={item}
                      key={index}
                    />
                  );
                } else if (item.dataType == "user") {
                  return (
                    <RedditUserCard
                      item={item}
                      key={index}
                    />
                  );
                }
              })}
        </div>
      )}
    </div>
  );
};

export default Display;
