const SelectTag = ({ optionsArray, query, setQuery, labelName }) => {
  return (
    <label>
      <span className="text-gray-600">{labelName}</span>
      <select
        className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
        value={query.orderBy}
        onChange={(e) => setQuery({ ...query, orderBy: e.target.value })}
      >
        {optionsArray.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="rounded-md border  border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm"
          >
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectTag;
