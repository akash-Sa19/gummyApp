import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const youtubeVideoQueryApi = async (videoIdArray) => {
  if (!Array.isArray(videoIdArray) || videoIdArray.length === 0) {
    throw new Error("Invalid input: videoIdArray must be a non-empty array");
  }

  const chunkSize = 50; // Max number of video IDs that can be passed in a single API request
  let videoData = [];

  // Split videoIdArray into chunks of 50 IDs
  const chunks = [];
  for (let i = 0; i < videoIdArray.length; i += chunkSize) {
    const chunk = videoIdArray.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  // Fetch video data for each chunk
  for (const chunk of chunks) {
    const videoIdString = chunk.join(",");
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIdString}&key=${apiKey}`;

    try {
      const response = await axios.get(baseUrl);
      console.log("Fetched video data:", response.data.items);

      // Combine results from each request
      videoData = videoData.concat(response.data.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
      throw error;
    }
  }

  return videoData;
};
