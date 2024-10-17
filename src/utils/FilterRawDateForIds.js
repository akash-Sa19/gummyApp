import { aiSearchRawData } from "../constants/rawData.js";

export function filterRawDateForIds(rawData) {
  const videoIds = rawData.map(({ id }) => id.videoId);
  return [...new Set(videoIds)];
}
console.log(filterRawDateForIds(aiSearchRawData));

// const filteredData = rawData.map(({ id, snippet }) => ({
//   videoId: id.videoId,
//   channelId: snippet.channelId,
//   channelName: snippet.channelTitle,
//   videoTitle: snippet.title,
//   videoDescription: snippet.description,
// }));
