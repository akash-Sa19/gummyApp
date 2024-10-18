import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const youtubeSearchQueryApi = async (
  {
    queryString,
    type,
    publishedAfter,
    publishedBefore,
    location,
    locationRadius,
    maxResults, // Add a maxResults parameter to control how many items you want
  },
  setIsFetching
) => {
  console.log({
    "queryString ": queryString,
    "type ": type,
    "publishedAfter ": publishedAfter,
    "publishedBefore ": publishedBefore,
    "location ": location,
    "maxResults ": maxResults,
    "locationRadius ": locationRadius,
  });

  // Base API URL with maxResults set to 50 per request
  let BaseURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&order=relevance&q=${queryString}&maxResults=50`;

  if (type !== "") {
    BaseURL += `&type=${type}`;
  }
  if (publishedAfter !== "") {
    BaseURL += `&publishedAfter=${publishedAfter}`;
  }
  if (publishedBefore !== "") {
    BaseURL += `&publishedBefore=${publishedBefore}`;
  }
  if (location !== "") {
    BaseURL += `&location=${location}`;
  }
  if (locationRadius !== "") {
    BaseURL += `&locationRadius=${locationRadius}`;
  }

  let allData = [];
  let nextPageToken = ""; // To store the token for the next page
  let fetchedResultsCount = 0; // To keep track of how many results we've fetched so far

  try {
    // Loop to get all pages of results until we reach the desired maxResults
    do {
      let url = BaseURL;

      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`; // Add pageToken to fetch the next set of results
      }

      console.log(`Fetching: ${url}`);

      const response = await axios.get(url);

      const items = response.data.items;
      nextPageToken = response.data.nextPageToken || null; // Get the nextPageToken

      // Add the new items to the allData array until we reach maxResults
      items.forEach((item) => {
        if (fetchedResultsCount < maxResults) {
          allData.push(item);
          fetchedResultsCount++;
        }
      });

      // If we've fetched the desired number of results, stop
      if (fetchedResultsCount >= maxResults) {
        break;
      }

      // Check if there's more data to fetch (nextPageToken will be null if there's no more data)
    } while (nextPageToken);

    return allData;
  } catch (err) {
    console.log(err);
    setIsFetching(false);
  }
};

//   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=25&order=date&q=news&type=video&key=${apiKey}`
