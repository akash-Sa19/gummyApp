import axios, { all } from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MAX_RESULTS = import.meta.env.VITE_MAX_NUMBER_OF_RESULTS;
const CHUNK_SIZE = import.meta.env.VITE_MAX_CHUNK_SIZE;
const BASE_URL = import.meta.env.VITE_GOOGLE_API_BASE_URL;

export const youtubeSearchQueryApi = async ({
  queryString,
  type,
  sortByTime,
  location,
  locationRadius,
}) => {
  const buildBaseURL = () => {
    const params = new URLSearchParams({
      part: "snippet",
      key: API_KEY,
      order: "relevance",
      q: queryString,
      maxResults: CHUNK_SIZE,
      type: "video",
    });

    if (location && locationRadius) {
      params.append("location", location);
      params.append("locationRadius", locationRadius);
    }

    if (sortByTime && sortByTime != "all") {
      const timeFrames = {
        week: 7,
        month: 30,
        year: 365,
      };
      const daysToSubtract = timeFrames[sortByTime];
      if (daysToSubtract) {
        const time = new Date(
          Date.now() - daysToSubtract * 24 * 60 * 60 * 1000
        ).toISOString();
        params.append("publishedAfter", time);
      }
    }

    return `${BASE_URL}/search?${params.toString()}`;
  };

  const BaseURL = buildBaseURL();
  let allData = [];
  let nextPageToken = "";
  let fetchedResultsCount = 0;

  try {
    do {
      const url = nextPageToken
        ? `${BaseURL}&pageToken=${nextPageToken}`
        : BaseURL;

      const response = await axios.get(url);
      const items = response.data.items;

      items.forEach((item) => {
        if (fetchedResultsCount < MAX_RESULTS) {
          allData.push(item);
          fetchedResultsCount++;
        }
      });

      nextPageToken = response.data.nextPageToken || null;
    } while (nextPageToken && fetchedResultsCount < MAX_RESULTS);

    console.log("search results count", allData.length);
    return allData;
  } catch (err) {
    console.error("Error fetching data from YouTube API:", err);
    return []; // Return an empty array on error
  }
};
