import React from "react";
import { loader } from "../assets";
import { rawData } from "../constants/index.js";
import Card from "./subComponents/Card.jsx";

const Display = ({ isFetching, error, data }) => {
  const dummyData = rawData;
  return (
    <div className="flex items-center justify-center w-full my-10">
      {isFetching ? (
        <img
          src={loader}
          alt="Loader"
          className="object-contain w-20 h-10"
        />
      ) : error ? (
        <p className="font-bold text-center text-black font-inter">
          Well, that wasn't suppose to happen...
          <br />
          <span className="font-normal text-gray-700 font-satoshi">
            {error?.data?.error}
          </span>
        </p>
      ) : (
        <div className="w-full rounded-md flex flex-col gap-8">
          {data.map(({ id, snippet }, index) => {
            //   console.log("id :", id, "snippet :", snippet);
            return (
              <Card
                key={id.videoId}
                videoId={id.videoId}
                snippet={snippet}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Display;
