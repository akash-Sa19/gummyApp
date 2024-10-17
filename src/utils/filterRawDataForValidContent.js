import { youtubeVideoQueryApi } from "../articles/Youtube/youtubeVideoQueryApi";
import { filterRawDateForIds } from "./FilterRawDateForIds";
import { isAShortVideo } from "./isShortVideo";

export const analyzeTrendingVideos = async (rawDataArray) => {
  const videoIds = filterRawDateForIds(rawDataArray);
  const videoContentArray = await youtubeVideoQueryApi(videoIds);

  let trendingVideos = [];
  videoContentArray.forEach(({ id, snippet, contentDetails, statistics }) => {
    let views = statistics.viewCount;
    let likes = statistics.likeCount;

    if (
      views > 10_000 &&
      likes > 5_000 &&
      !isAShortVideo(contentDetails.duration)
    ) {
      trendingVideos.push({
        snippet,
        contentDetails,
        statistics,
        id,
      });
    }
  });

  return trendingVideos;
};

export const analyzeHotVideos = async (rawDataArray) => {
  const videoIds = filterRawDateForIds(rawDataArray);
  const videoContentArray = await youtubeVideoQueryApi(videoIds);

  let hotVideos = [];
  videoContentArray.forEach(({ snippet, contentDetails, statistics }) => {
    let views = statistics.viewCount;
    let comments = statistics.commentCount;

    if (
      views > 10_000 &&
      comments > 500 &&
      !isAShortVideo(contentDetails.duration)
    ) {
      hotVideos.push({
        snippet,
        contentDetails,
        statistics,
      });
    }
  });

  return hotVideos;
};

//  https://youtube.com/shorts/TunPG1A-5oM?si=RHK2u3_GYJsFxgmH
