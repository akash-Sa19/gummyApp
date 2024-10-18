import axios from "axios";

const APIKEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHUNK_SIZE = import.meta.env.VITE_MAX_CHUNK_SIZE;

export const youtubeChannelQueryApi = async (channelIdArray) => {
  if (!Array.isArray(channelIdArray) || channelIdArray.length === 0) {
    throw new Error("Invalid input: channelIdArray must be a non-empty array");
  }

  let channelData = [];

  const chunkSize = CHUNK_SIZE;
  // split channelIdAraay into chunks of chunkSize
  const chunks = [];
  for (let i = 0; i < channelIdArray; i += chunkSize) {
    const chunk = channelIdArray.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  for (const chunk of chunks) {
    const channelIdString = chunk.join(",");
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIdString}&key=${APIKEY}`;

    try {
      const response = await axios.get(baseUrl);
      console.log("fetched channel data", response);

      if (response.data.kind !== "youtube#channelListResponse") {
        throw new Error("Error fetching channel data: Invalid response kind");
      }

      channelData = [...channelData, ...response.data.items];
    } catch (error) {
      console.error("Error fetching channel data:", error);
      throw error;
    }
  }
  return channelData;
};
