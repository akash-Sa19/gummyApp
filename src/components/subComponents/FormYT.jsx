import { linkIcon } from "../../assets";

const orderByOptions = [
  {
    value: "relevance",
    name: "Relevance",
  },
  {
    value: "date",
    name: "Date",
  },
  {
    value: "viewCount",
    name: "View Count",
  },
  {
    value: "rating",
    name: "Rating",
  },
];

const FormYT = ({ query, setQuery, handleSubmit }) => {
  return (
    <div className="flex flex-col w-full gap-2 mt-6">
      <form
        className="relative flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="relative flex items-center justify-center w-full">
          <img
            src={linkIcon}
            alt="Link Icon"
            className="absolute left-0 w-5 my-2 ml-3"
          />
          <input
            type="text"
            placeholder="Keyword, topic or subjects..."
            required
            value={query.queryString}
            onChange={(e) =>
              setQuery({ ...query, queryString: e.target.value })
            }
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 peer"
          />
          <button
            type="submit"
            className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </div>
        {/* filters */}
        <div className="flex items-center justify-between w-full mt-4">
          <div className="w-1/2 mr-10">
            <label>
              <span className="text-gray-600">Order By :</span>
              <select
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
                value={query.orderBy}
                onChange={(e) =>
                  setQuery({ ...query, orderBy: e.target.value })
                }
              >
                {orderByOptions.map((option) => (
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
          </div>
          <div className="w-1/2">
            <span className="text-gray-600">Max Results :</span>
            <label>
              <input
                type="number"
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
                placeholder="Max Results"
                value={query.maxResult}
                onChange={(e) =>
                  setQuery({ ...query, maxResult: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormYT;
