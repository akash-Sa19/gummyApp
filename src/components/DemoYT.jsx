import { useState } from "react";
import { youtubeSearchQueryApi } from "../articles/Youtube/youtubeSearchQueryApi";
import Display from "./Display";
// import History from "./History";
import { FormYT } from "./subComponents";
import {
  analyzeHotVideos,
  analyzeTrendingVideos,
} from "../utils/filterRawDataForValidVideoContent";
import { analyzeChannels } from "../utils/filterRawDataForValidChannelContent";

const randomChannelData = [
  {
    kind: "youtube#searchResult",
    etag: "ZJNHa6DTKOIakVM0PR6nHtyDMcg",
    id: {
      kind: "youtube#channel",
      channelId: "UCYDxMiKU0m7THLtscfu_1lQ",
    },
    snippet: {
      publishedAt: "2023-08-14T15:55:07Z",
      channelId: "UCYDxMiKU0m7THLtscfu_1lQ",
      title: "AI video",
      description:
        "Stable Diffusion을 사용하여 제작한 가상의 AI사진 룩북 채널입니다. 등장하는 인물의 의상및 컨셉등을 직접 설정하여 만든 가상의 AI ...",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/AK4J-6OEnj2nkpiv1dx7EqMtd0XN93Sj2rFRobzLmcRBLMatWGV3tMq6ZRcNcMP0NePhMnefGQ=s88-c-k-c0xffffffff-no-rj-mo",
        },
        medium: {
          url: "https://yt3.ggpht.com/AK4J-6OEnj2nkpiv1dx7EqMtd0XN93Sj2rFRobzLmcRBLMatWGV3tMq6ZRcNcMP0NePhMnefGQ=s240-c-k-c0xffffffff-no-rj-mo",
        },
        high: {
          url: "https://yt3.ggpht.com/AK4J-6OEnj2nkpiv1dx7EqMtd0XN93Sj2rFRobzLmcRBLMatWGV3tMq6ZRcNcMP0NePhMnefGQ=s800-c-k-c0xffffffff-no-rj-mo",
        },
      },
      channelTitle: "AI video",
      liveBroadcastContent: "none",
      publishTime: "2023-08-14T15:55:07Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "YlIMEXt2RXCrhvGdo8reAbRneq8",
    id: {
      kind: "youtube#channel",
      channelId: "UCX4fV50d398w_YSGgKwa51Q",
    },
    snippet: {
      publishedAt: "2005-10-01T05:46:23Z",
      channelId: "UCX4fV50d398w_YSGgKwa51Q",
      title: "AI",
      description: "AI Official YouTube Channel.",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/cmts_dHAOizV591gEW6okFNTpGKISjsv3OhuGY3ANdQeWHHDyCudiiKG35VYPtUH0W724zsZ3X8=s88-c-k-c0xffffffff-no-rj-mo",
        },
        medium: {
          url: "https://yt3.ggpht.com/cmts_dHAOizV591gEW6okFNTpGKISjsv3OhuGY3ANdQeWHHDyCudiiKG35VYPtUH0W724zsZ3X8=s240-c-k-c0xffffffff-no-rj-mo",
        },
        high: {
          url: "https://yt3.ggpht.com/cmts_dHAOizV591gEW6okFNTpGKISjsv3OhuGY3ANdQeWHHDyCudiiKG35VYPtUH0W724zsZ3X8=s800-c-k-c0xffffffff-no-rj-mo",
        },
      },
      channelTitle: "AI",
      liveBroadcastContent: "none",
      publishTime: "2005-10-01T05:46:23Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "aExNkpQ3vykoRhXKz11-Ic-SqLA",
    id: {
      kind: "youtube#channel",
      channelId: "UCiHQ27FMsGlGmkQBCihiw8w",
    },
    snippet: {
      publishedAt: "2018-10-31T23:14:50Z",
      channelId: "UCiHQ27FMsGlGmkQBCihiw8w",
      title: "AI",
      description: "",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/ytc/AIdro_m0TBRqGKua1oiDWRaAzecM4BrpkNTFbv4FG9V4mXiKEQ=s88-c-k-c0xffffffff-no-rj-mo",
        },
        medium: {
          url: "https://yt3.ggpht.com/ytc/AIdro_m0TBRqGKua1oiDWRaAzecM4BrpkNTFbv4FG9V4mXiKEQ=s240-c-k-c0xffffffff-no-rj-mo",
        },
        high: {
          url: "https://yt3.ggpht.com/ytc/AIdro_m0TBRqGKua1oiDWRaAzecM4BrpkNTFbv4FG9V4mXiKEQ=s800-c-k-c0xffffffff-no-rj-mo",
        },
      },
      channelTitle: "AI",
      liveBroadcastContent: "none",
      publishTime: "2018-10-31T23:14:50Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "YBMFuWNK-4zOVGNtAHNYAPtXabk",
    id: {
      kind: "youtube#channel",
      channelId: "UCHjyhzW_TfRAhWMgdfwzrKg",
    },
    snippet: {
      publishedAt: "2023-09-18T02:40:23Z",
      channelId: "UCHjyhzW_TfRAhWMgdfwzrKg",
      title: "Ai Life",
      description:
        "Stable Diffusion 으로 만든 가상의 Ai가 사는 세상 입니다. 여기에서는 원하는 어디로든 여행을 떠날 수 있어요. 저와 함께 세계 곳곳 ...",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/l7WT49zn3VAj_b4njponnsyvSDBJifJ8R4iY9nQnWs_QNR3cYjSlijOuTm7qwHdV1z_UCw1a=s88-c-k-c0xffffffff-no-rj-mo",
        },
        medium: {
          url: "https://yt3.ggpht.com/l7WT49zn3VAj_b4njponnsyvSDBJifJ8R4iY9nQnWs_QNR3cYjSlijOuTm7qwHdV1z_UCw1a=s240-c-k-c0xffffffff-no-rj-mo",
        },
        high: {
          url: "https://yt3.ggpht.com/l7WT49zn3VAj_b4njponnsyvSDBJifJ8R4iY9nQnWs_QNR3cYjSlijOuTm7qwHdV1z_UCw1a=s800-c-k-c0xffffffff-no-rj-mo",
        },
      },
      channelTitle: "Ai Life",
      liveBroadcastContent: "none",
      publishTime: "2023-09-18T02:40:23Z",
    },
  },
];

const DemoYT = ({ platform }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    type: "video", // | "channel"
    sortByTime: "week", // | "day" | "week" | "month" | "year"
    location: "",
    locationRadius: "",
    whatsNew: "trending", // | hot
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);

    try {
      const response = await youtubeSearchQueryApi(query);
      console.log("response from youtubeSearchQueryApi", response);
      let videoContentArray = [];

      if (query.type === "video") {
        if (query.whatsNew === "hot") {
          videoContentArray = await analyzeHotVideos(response);
        } else if (query.whatsNew === "trending") {
          videoContentArray = await analyzeTrendingVideos(response);
        }
      } else if (query.type === "channel") {
        videoContentArray = await analyzeChannels(response);
        // videoContentArray = await analyzeChannels(randomChannelData);
      } else {
        throw new Error("Invalid query type");
      }

      console.log("MainContentArray", videoContentArray);
      setData(videoContentArray);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  return (
    <section className="w-full mt-4">
      {/* search */}
      <FormYT
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      {/* <History /> */}
      <Display
        isFetching={isFetching}
        // error={true}
        data={data}
        platform={platform}
      />
    </section>
  );
};

export default DemoYT;
