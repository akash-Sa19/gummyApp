import { formatDate } from "../../../utils/formatDate";

const RedditCommunityCard = ({ item }) => {
  const {
    id,
    name,
    title,
    headerImage,
    description,
    over18,
    createdAt,
    numberOfMembers,
    url,
  } = item;
  return (
    <div className="w-full p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow-md md:w-96">
      {/* Community Header Image */}
      {headerImage && (
        <div className="mb-4">
          <img
            src={headerImage}
            alt={`${title} Header Image`}
            className="object-cover w-full h-32 rounded-lg"
          />
        </div>
      )}

      {/* Community Title */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-xl font-bold text-blue-600 hover:underline">
          r/{title}
        </h3>
      </a>

      {/* Community Description */}
      <p className="mt-2 mb-4 text-gray-700">{description}</p>

      {/* Community Details */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>{numberOfMembers.toLocaleString()} members</span>
        <span>Created: {formatDate(createdAt)}</span>
      </div>

      {/* Over 18 Warning */}
      {over18 && (
        <p className="mb-2 text-xs text-red-500">
          This community is for 18+ only.
        </p>
      )}

      {/* Join Community Button */}
      <div className="flex justify-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Visit Community
        </a>
      </div>
    </div>
  );
};

export default RedditCommunityCard;
