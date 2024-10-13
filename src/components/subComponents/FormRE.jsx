import { linkIcon } from "../../assets";

const orderByOptions = [
  {
    value: "all",
    name: "All",
  },
  {
    value: "day",
    name: "Today",
  },
  {
    value: "week",
    name: "This Week",
  },
  {
    value: "month",
    name: "This Month",
  },
  {
    value: "year",
    name: "This Year",
  },
  {
    value: "lastHour",
    name: "Last Hour",
  },
];
const serchTypeOptions = [
  {
    value: "posts",
    name: "Posts",
  },
  {
    value: "communities",
    name: "Communities",
  },
  {
    value: "users",
    name: "Users",
  },
];
const sortSearchOptions = [
  {
    value: "relevance",
    name: "Relevance",
  },
  {
    value: "hot",
    name: "Hot",
  },
  {
    value: "top",
    name: "Top",
  },
  {
    value: "new",
    name: "New",
  },
];

const FormRE = ({ query, setQuery, handleSubmit }) => {
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
        <div className="flex items-center justify-between w-full gap-10 mt-4">
          <div className="w-1/4">
            <label>
              <span className="text-gray-600">Order By Time:</span>
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
          <div className="w-1/4">
            <label>
              <span className="text-gray-600">Search Type :</span>
              <select
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
                value={query.searchType}
                onChange={(e) =>
                  setQuery({ ...query, searchType: e.target.value })
                }
              >
                {serchTypeOptions.map((option) => (
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
          <div className="w-1/4">
            <label>
              <span className="text-gray-600">Sort By :</span>
              <select
                className="block w-full rounded-md border border-gray-200 bg-white py-2.5 px-3 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0"
                value={query.sortBy}
                onChange={(e) => setQuery({ ...query, sortBy: e.target.value })}
              >
                {sortSearchOptions.map((option) => (
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
          <div className="w-1/4">
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

export default FormRE;
