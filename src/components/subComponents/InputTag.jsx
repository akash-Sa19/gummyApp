import { Input } from "postcss";
import React from "react";
import { logo } from "../../assets";

const InputTag = ({ setQuery, labelName, placeholder, tag, query, name }) => {
  return (
    <label>
      <span className="text-gray-600">{labelName}</span>
      <input
        className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
        type={tag}
        placeholder={placeholder ? placeholder : undefined}
        value={query[name]}
        onChange={(e) => {
          setQuery({ ...query, [name]: e.target.value });
          console.log(query[name]);
        }}
      />
    </label>
  );
};

export default InputTag;
