import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHUNK_SIZE = import.meta.env.VITE_MAX_CHUNK_SIZE;
const API_BASE_URL = import.meta.env.VITE_GOOGLE_API_BASE_URL;

export const youtubeChannelQueryApi = async (channelIdArray) => {
  if (!Array.isArray(channelIdArray) || channelIdArray.length === 0) {
    throw new Error("Invalid input: channelIdArray must be a non-empty array");
  }

  let channelData = [];

  // split channelIdArray into chunks of chunkSize
  const chunks = [];
  for (let i = 0; i < channelIdArray.length; i += CHUNK_SIZE) {
    const chunk = channelIdArray.slice(i, i + CHUNK_SIZE);
    chunks.push(chunk);
  }

  for (const chunk of chunks) {
    const channelIdString = chunk.join(",");
    const channelUrl = `${API_BASE_URL}/channels?part=statistics,snippet&fields=items(id,kind,snippet(title,description,publishedAt,thumbnails,defaultLanguage,country),statistics(subscriberCount,viewCount,videoCount))&id=${channelIdString}&key=${API_KEY}`;

    try {
      const response = await axios.get(channelUrl);
      // console.log("fetched channel data", response);

      // Map through each item and collect relevant data
      const chunkOfChannelData = response.data.items.map((item) => {
        if (item.kind !== "youtube#channel") {
          throw new Error("Error fetching channel data: Invalid response kind");
        }

        return {
          video: {},
          channel: item,
          kind: item.kind,
        };
      });

      // Merge the new chunk data with the overall channelData
      channelData = [...channelData, ...chunkOfChannelData];
    } catch (error) {
      console.error("Error fetching channel data:", error);
      throw error;
    }
  }

  return channelData;
};
