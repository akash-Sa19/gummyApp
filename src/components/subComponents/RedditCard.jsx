import { formatDate } from "../../utils/formatDate";

const RedditCard = ({ item }) => {
  const {
    id,
    parsedId,
    url,
    username,
    title,
    communityName,
    parsedCommunityName,
    body,
    numberOfComments,
    upVotes,
    isVideo,
    createdAt,
    isAd,
    over18,
    thumbnailUrl,
  } = item;
  // Extract image URL from body if available
  const imageUrl = thumbnailUrl;

  return (
    <div className="flex p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md">
      {/* Left Column: Upvotes */}
      <div className="flex flex-col items-center justify-start w-12 mr-4">
        <button className="text-gray-400 hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <span className="text-sm font-bold text-gray-800">{upVotes}</span>
        <button className="text-gray-400 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Right Column: Content */}
      <div className="flex-1">
        {/* Community Name, Username, and Timestamp */}
        <div className="mb-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{communityName}</span> •{" "}
          <span>Posted by u/{username}</span> • {formatDate(createdAt)}
        </div>

        {/* Post Title */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="mb-2 text-lg font-bold text-gray-900 hover:underline">
            {title}
          </h3>
        </a>

        {/* Body: Image or Video */}
        {isVideo ? (
          <div className="w-full mb-4">
            <iframe
              className="w-full h-64"
              src={item?.videoUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* <video className="w-full h-64">
              <source src={url} type="video/mp4" />
            </video> */}
          </div>
        ) : imageUrl ? (
          <div className="w-full mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4 text-sm text-gray-700">{body}</div>
        )}

        {/* Comments and Details */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span>{numberOfComments} Comments</span>
            </a>
            <span>•</span>
            <span>Share</span>
            <span>•</span>
            <span>Save</span>
          </div>
          {over18 && <span className="font-semibold text-red-500">NSFW</span>}
          {isAd && (
            <span className="font-semibold text-blue-500">Sponsored</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedditCard;
