import axios from "axios";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHUNK_SIZE = import.meta.env.VITE_MAX_CHUNK_SIZE;
const API_BASE_URL = import.meta.env.VITE_GOOGLE_API_BASE_URL;

function getVideoIds(videoIdAndchannelIdArray) {
  return videoIdAndchannelIdArray.map((item) => item.videoId);
}

function getChannelIds(videoIdAndchannelIdArray) {
  return videoIdAndchannelIdArray.map((item) => item.channelId);
}

const fetchVideoAndChannelData = async (videoUrl, channelUrl) => {
  return Promise.all([axios.get(videoUrl), axios.get(channelUrl)]);
};

export const youtubeChannelAndVideoQueryApi = async (
  videoIdAndchannelIdArray
) => {
  if (
    !Array.isArray(videoIdAndchannelIdArray) ||
    videoIdAndchannelIdArray.length === 0
  ) {
    throw new Error(
      "Invalid input: videoIdAndchannelIdArray must be a non-empty array"
    );
  }

  const chunks = [];
  for (let i = 0; i < videoIdAndchannelIdArray.length; i += CHUNK_SIZE) {
    const chunk = videoIdAndchannelIdArray.slice(i, i + CHUNK_SIZE);
    chunks.push(chunk);
  }

  const promises = chunks.map(async (chunk) => {
    let videoIdString = getVideoIds(chunk).join(",");
    let channelIdString = getChannelIds(chunk).join(",");

    const videoUrl = `${API_BASE_URL}/videos?part=snippet,statistics,contentDetails&fields=items(id,snippet(title,description,channelTitle,thumbnails,publishedAt,channelId),statistics(viewCount,likeCount,commentCount),contentDetails(duration))&id=${videoIdString}&key=${API_KEY}`;
    const channelUrl = `${API_BASE_URL}/channels?part=statistics&fields=items(id,statistics(subscriberCount))&id=${channelIdString}&key=${API_KEY}`;

    try {
      const [videoApiResponse, channelApiResponse] =
        await fetchVideoAndChannelData(videoUrl, channelUrl);

      const channelMap = new Map();
      channelApiResponse.data.items.forEach((channel) => {
        channelMap.set(channel.id, channel);
      });

      return videoApiResponse.data.items
        .map((video) => {
          const channelId = video.snippet.channelId;
          const channelData = channelMap.get(channelId);
          if (channelData) {
            return { video: video, channel: channelData };
          }
        })
        .filter((item) => item); // Filter out any undefined results
    } catch (error) {
      console.error("Error fetching channel or video data:", error);
      return [];
    }
  });

  const allResults = await Promise.all(promises);
  return allResults.flat();
};
