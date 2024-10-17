import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const youtubeVideoQueryApi = async (videoIdArray) => {
  if (!Array.isArray(videoIdArray) || videoIdArray.length === 0) {
    throw new Error("Invalid input: videoIdArray must be a non-empty array");
  }

  let videoIdString = videoIdArray.join(",");

  let baseUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIdString}&key=${apiKey}`;

  try {
    const response = await axios.get(baseUrl);
    console.log("video data  :", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching video data:", error);
    throw error;
  }
};
