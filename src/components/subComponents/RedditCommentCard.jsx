import { formatDate } from "../../utils/formatDate";

const RedditCommentCard = ({ item }) => {
  const {
    id,
    parsedId,
    url,
    parentId,
    username,
    category,
    communityName,
    body,
    createdAt,
    upVotes,
    numberOfreplies,
  } = item;
  return (
    <div className="flex flex-col py-4 pl-4 mb-4 bg-white border-l-2 border-gray-300 rounded-md shadow-sm">
      {/* Comment Header */}
      <div className="flex items-center mb-2 space-x-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-800">u/{username}</span>
        <span>•</span>
        <span>{formatDate(createdAt)}</span>
        <span>•</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          View on Reddit
        </a>
      </div>

      {/* Comment Body */}
      <div className="mb-2 text-gray-900">
        {body ? (
          <p className="text-base">{body}</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="text-base"
          ></div>
        )}
      </div>

      {/* Upvotes and Reply Section */}
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {/* Upvote/Downvote Buttons */}
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <span className="font-semibold text-gray-700">{upVotes}</span>
          <button className="text-gray-400 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
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

        {/* Reply Button */}
        <div>
          <button className="hover:underline">Reply</button>
        </div>

        {/* Number of Replies */}
        {numberOfreplies > 0 && (
          <div>
            <button className="text-blue-500 hover:underline">
              {numberOfreplies} {numberOfreplies === 1 ? "Reply" : "Replies"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedditCommentCard;
