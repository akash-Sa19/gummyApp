import React from "react";

const Options = ({ platform, setPlatform }) => {
  return (
    <div className="flex items-center justify-around w-full gap-2 mt-10 text-lg text-gray-600 sm:test-xl">
      <div
        className={`w-[150px] py-1 px-2 rounded-md text-center font-bold ${
          platform === "YT"
            ? "bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent"
            : "text-black"
        }`}
        onClick={() => setPlatform("YT")}
      >
        <p className="">Youtube</p>
      </div>
      <div
        className={`w-[150px] py-1 px-2 rounded-md text-center font-bold ${
          platform === "RE"
            ? "bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent"
            : "text-black"
        }`}
        onClick={() => setPlatform("RE")}
      >
        <p>Reddit</p>
      </div>
    </div>
  );
};

export default Options;
