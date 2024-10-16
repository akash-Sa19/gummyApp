import { linkIcon } from "../../assets";
import SelectTag from "./SelectTag";
import { orderByOptions } from "../../constants";
import InputTag from "./InputTag";

const FormYT = ({ query, setQuery, handleSubmit }) => {
  const FilterOptions = [
    {
      tag: "select",
      options: orderByOptions,
      labelName: "Order By :",
    },
    {
      tag: "input",
      labelName: "Max Result :",
    },
  ];
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
          {FilterOptions.map(({ tag, options, labelName }, index) => {
            if (tag === "select") {
              return (
                <div
                  key={index}
                  className={`w-1/${FilterOptions.length}`}
                >
                  <SelectTag
                    optionsArray={options}
                    query={query}
                    setQuery={setQuery}
                    labelName={labelName}
                  />
                </div>
              );
            }
            if (tag === "input") {
              return (
                <div
                  key={index}
                  className={`w-1/${FilterOptions.length}`}
                >
                  <InputTag
                    key={labelName}
                    query={query}
                    setQuery={setQuery}
                    labelName={labelName}
                  />
                </div>
              );
            }
          })}
        </div>
      </form>
    </div>
  );
};

export default FormYT;
