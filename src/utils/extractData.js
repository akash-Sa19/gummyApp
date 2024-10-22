export function filterRawDataForIds(rawData) {
  const videoIds = rawData.map(({ id }) => id.videoId);
  return [...new Set(videoIds)];
}

export function filterRawDataForChannelId(rawData) {
  const channelIds = rawData.map((data) => data.snippet.channelId);
  return [...new Set(channelIds)];
}

export function filterRawDataForVideoIdsAndChannelIds(rawData) {
  const ids = rawData.map(({ id, snippet }) => ({
    videoId: id.videoId,
    channelId: snippet.channelId,
  }));
  return [...new Set(ids)];
}

export function extractTitleAndDescription(rawData) {
  // console.log(rawData);

  return rawData.map((data) => ({
    title: data.title,
    description: data.description,
  }));
}
