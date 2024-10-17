import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const youtubeSearchQueryApi = async (
  {
    queryString,
    orderBy,
    maxResult,
    eventType,
    type,
    publishedAfter,
    publishedBefore,
    location,
    locationRadius,
  },
  setIsFetching
) => {
  console.log({
    "queryString ": queryString,
    "orderBy ": orderBy,
    "maxResult ": maxResult,
    "type ": type,
    "eventType ": eventType,
    "publishedAfter ": publishedAfter,
    "publishedBefore ": publishedBefore,
    "location ": location,
    "locationRadius ": locationRadius,
  });

  let BaseURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}`;

  if (queryString !== "") {
    BaseURL += `&q=${queryString}`;
  }
  if (orderBy !== "") {
    BaseURL += `&order=${orderBy}`;
  }
  if (maxResult !== "") {
    BaseURL += `&maxResults=${maxResult}`;
  }
  if (type !== "") {
    BaseURL += `&type=${type}`;
  }
  if (eventType !== "") {
    BaseURL += `&eventType=${eventType}`;
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

  console.log(BaseURL);

  const data = await axios
    .get(BaseURL)
    .then((res) => {
      console.log("lots of data", res.data.items);
      return res.data.items;
    })
    .finally(() => {
      // setIsFetching(false);
    });
  return data;
};

//   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=25&order=date&q=news&type=video&key=${apiKey}`

export const youtubeVideoQueryApi = (videoId) => {
  let baseUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }`;
};
