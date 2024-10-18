import { isAShortVideo } from "./isShortVideo";
import { filterRawDataForVideoIdsAndChannelIds } from "./extractData";
import { youtubeChannelAndVideoQueryApi } from "../articles/Youtube/youtubeChannelAndVideoqueryApi";

const handleRawData = async (rawDataArray) => {
  const videoIdAndchannelIdArray =
    filterRawDataForVideoIdsAndChannelIds(rawDataArray);
  return await youtubeChannelAndVideoQueryApi(videoIdAndchannelIdArray);
};

const filterVideos = (videoContentArray, criteria) => {
  const filteredVideos = videoContentArray.filter((item) => {
    const viewCount = parseInt(item?.video?.statistics?.viewCount || "0", 10);
    const likeCount = parseInt(item?.video?.statistics?.likeCount || "0", 10);
    const commentCount = parseInt(
      item?.video?.statistics?.commentCount || "0",
      10
    );
    const subscriberCount = parseInt(
      item?.channel?.statistics?.subscriberCount || "0",
      10
    );
    const isAReel = isAShortVideo(item?.video?.contentDetails?.duration);

    // And add new filter criteria here
    // Apply different criteria depending on the type of video
    if (criteria === "trending") {
      return (
        viewCount > 10000 &&
        likeCount > 5000 &&
        subscriberCount > 1500 &&
        !isAReel
      );
    } else if (criteria === "hot") {
      return (
        viewCount > 10000 &&
        commentCount > 500 &&
        subscriberCount > 1500 &&
        !isAReel
      );
    }
    return false;
  });

  // Sort the filtered videos by viewCount and then likeCount
  const sortedVideos = filteredVideos.sort((a, b) => {
    const viewCountA = parseInt(a?.video?.statistics?.viewCount || "0", 10);
    const viewCountB = parseInt(b?.video?.statistics?.viewCount || "0", 10);

    // First sort by viewCount
    if (viewCountB !== viewCountA) {
      return viewCountB - viewCountA; // Descending order
    }

    // If viewCounts are equal, sort by likeCount
    const likeCountA = parseInt(a?.video?.statistics?.likeCount || "0", 10);
    const likeCountB = parseInt(b?.video?.statistics?.likeCount || "0", 10);

    return likeCountB - likeCountA; // Descending order
  });
  return sortedVideos;
};

// Reusable function for analyzing videos based on criteria
const analyzeVideos = async (rawDataArray, criteria) => {
  if (!Array.isArray(rawDataArray) || rawDataArray.length === 0) {
    throw new Error("Invalid input: rawDataArray must be a non-empty array");
  }

  const videoContentArray = await handleRawData(rawDataArray);
  return filterVideos(videoContentArray, criteria);
};

// Specific functions for trending and hot videos
export const analyzeTrendingVideos = (rawDataArray) =>
  analyzeVideos(rawDataArray, "trending");
export const analyzeHotVideos = (rawDataArray) =>
  analyzeVideos(rawDataArray, "hot");
