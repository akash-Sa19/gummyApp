import axios from "axios";

export const youtubeQueryApi = async (
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
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  console.log({
    "queryString ": queryString,
    "orderBy ": orderBy,
    "maxResult ": maxResult,
    "type ": type,
    "eventType ": eventType,
  });

  const data = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&order=${orderBy}&q=${queryString}&key=${apiKey}&eventType=${eventType}&type=${type}`
    )
    // .get(
    //   `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=25&order=date&q=news&type=video&key=${apiKey}`
    // )
    .then((res) => {
      //   console.log(res.data.items);
      return res.data.items;
    })
    .finally(() => {
      setIsFetching(false);
    });

  return data;
};
