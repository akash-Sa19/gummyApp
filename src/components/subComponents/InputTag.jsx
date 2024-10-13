import React from "react";

const InputTag = ({ query, setQuery, labelName }) => {
  return (
    <label>
      <span className="text-gray-600">{labelName}</span>
      <input
        type="number"
        className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
        placeholder="Max Results"
        value={query.maxResult}
        onChange={(e) => setQuery({ ...query, maxResult: e.target.value })}
      />
    </label>
  );
};

export default InputTag;
