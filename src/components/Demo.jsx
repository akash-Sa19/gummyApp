import { useState } from "react";
import Options from "./subComponents/Options";
import Form from "./subComponents/Form";
import { youtubeQueryApi } from "../articles/youtubeQueryApi";
import Display from "./Display";
import History from "./History";

const Demo = () => {
  const [platform, setPlatform] = useState("RE");
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({
    queryString: "",
    orderBy: "relevance",
    maxResult: 10,
  });
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await youtubeQueryApi(query, setIsFetching);
      setData(response);
      console.log("Demo/line:23 -> ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full mt-16">
      {/* options */}
      <Options
        platform={platform}
        setPlatform={setPlatform}
      />
      {/* search */}
      <Form
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <History />
      <Display
        isFetching={isFetching}
        // error={true}
        data={data}
      />
    </section>
  );
};

export default Demo;
