import { youtubeChannelQueryApi } from "../articles/Youtube/youtubeChannelQueyApi";
import { filterRawDataForChannelId } from "./extractData";

const SUBSCRIBER_COUNT_THRESHOLD = import.meta.env
  .VITE_SUBSCRIBER_COUNT_THRESHOLD;

export const analyzeChannels = async (rawDataArray) => {
  if (!Array.isArray(rawDataArray) || rawDataArray.length === 0) {
    throw new Error("Invalid input: rawDataArray must be a non-empty array");
  }

  const channelIdArray = filterRawDataForChannelId(rawDataArray);
  // apply different criteria depending on the type of video

  const channelDataArray = await youtubeChannelQueryApi(channelIdArray);

  // console.log("channelDataArray", channelDataArray);

  const filteredChannelArray = channelDataArray.filter((item) => {
    if (item.channel.kind !== "youtube#channel") {
      throw new Error("Error fetching channel data: Invalid response kind");
    }

    const subscriberCount = parseInt(
      item?.statistics?.subscriberCount || "0",
      10
    );
    if (subscriberCount < SUBSCRIBER_COUNT_THRESHOLD) {
      return item;
    }
  });

  // console.log("filteredChannelArray", filteredChannelArray);
  return filteredChannelArray;
};
