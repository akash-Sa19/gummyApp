import axios from "axios";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CHUNK_SIZE = import.meta.env.VITE_MAX_CHUNK_SIZE;
const API_BASE_URL = import.meta.env.VITE_GOOGLE_API_BASE_URL;

// Utility functions for extracting videoIds and channelIds from input array
function getVideoIds(videoIdAndchannelIdArray) {
  return videoIdAndchannelIdArray.map((item) => item.videoId);
}

function getChannelIds(videoIdAndchannelIdArray) {
  return videoIdAndchannelIdArray.map((item) => item.channelId);
}

// Function to fetch video and channel data simultaneously
const fetchChannelData = async (channelUrl) => {
  return axios.get(channelUrl);
};

const fetchVideoData = async (videoUrl) => {
  return axios.get(videoUrl);
};

// Main API function to query data
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

  // Split the input data into manageable chunks
  const chunks = [];
  for (let i = 0; i < videoIdAndchannelIdArray.length; i += CHUNK_SIZE) {
    const chunk = videoIdAndchannelIdArray.slice(i, i + CHUNK_SIZE);
    chunks.push(chunk);
  }

  const promises = chunks.map(async (chunk) => {
    // Join channel and video ids for API request
    let channelIdString = getChannelIds(chunk).join(",");

    // Fetch channel data first
    const channelUrl = `${API_BASE_URL}/channels?part=statistics&fields=items(id,statistics(subscriberCount))&id=${channelIdString}&key=${API_KEY}`;

    try {
      const channelApiResponse = await fetchChannelData(channelUrl);

      const filteredChannelMap = new Map();
      channelApiResponse.data.items.forEach((channel) => {
        const subscriberCount = parseInt(
          channel.statistics.subscriberCount,
          10
        );
        // Only keep channels with subscribers greater than 2000
        if (subscriberCount > 2000) {
          filteredChannelMap.set(channel.id, channel);
        }
      });

      // Fetch video details only for channels that passed the subscriber check
      const videoIdsForFilteredChannels = chunk
        .filter((item) => filteredChannelMap.has(item.channelId))
        .map((item) => item.videoId);

      if (videoIdsForFilteredChannels.length > 0) {
        let videoIdString = videoIdsForFilteredChannels.join(",");
        const videoUrl = `${API_BASE_URL}/videos?part=snippet,statistics,contentDetails&fields=items(id,snippet(title,description,channelTitle,thumbnails,publishedAt,channelId),statistics(viewCount,likeCount,commentCount),contentDetails(duration))&id=${videoIdString}&key=${API_KEY}`;

        const videoApiResponse = await fetchVideoData(videoUrl);

        return videoApiResponse.data.items
          .map((video) => {
            const channelId = video.snippet.channelId;
            const channelData = filteredChannelMap.get(channelId);
            if (channelData) {
              return { video: video, channel: channelData };
            }
          })
          .filter((item) => item); // Filter out any undefined results
      }

      return []; // Return an empty array if no videos passed the filter
    } catch (error) {
      console.error("Error fetching channel or video data:", error);
      return [];
    }
  });

  // Wait for all promises to resolve and return the combined results
  const allResults = await Promise.all(promises);
  return allResults.flat();
};
