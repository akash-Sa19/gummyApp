import axios from "axios";

export const youtubeQueryApi = async (
  { queryString, orderBy, maxResult },
  setIsFetching
) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const data = await axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&order=${orderBy}&q=${queryString}&key=${apiKey}`
    )
    .then((res) => {
      //   console.log(res.data.items);
      return res.data.items;
    })
    .finally(() => {
      setIsFetching(false);
    });

  return data;
};
