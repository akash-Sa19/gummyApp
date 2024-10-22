import { formatDate } from "../../../utils/formatDate";

const RedditUserCard = ({ item }) => {
  const {
    id,
    url,
    username,
    userIcon,
    postKarma,
    commentKarma,
    description,
    over18,
    createdAt,
  } = user;
  return (
    <div className="flex flex-col items-center w-full p-6 mb-6 bg-white border border-gray-300 rounded-lg shadow-md md:w-96">
      {/* User Icon */}
      <div className="mb-4">
        <img
          src={userIcon}
          alt={`${username}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
      </div>

      {/* Username */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 text-2xl font-bold text-blue-600 hover:underline"
      >
        u/{username}
      </a>

      {/* Karma Section */}
      <div className="flex mb-4 space-x-4">
        <div className="text-center">
          <p className="text-lg font-semibold">{postKarma.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Post Karma</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">
            {commentKarma.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Comment Karma</p>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mb-4 text-center text-gray-700">{description}</p>
      )}

      {/* Account Creation Date */}
      <div className="mb-4 text-sm text-gray-500">
        <p>Joined: {formatDate(createdAt)}</p>
      </div>

      {/* Over 18 Warning */}
      {over18 && (
        <p className="mb-4 text-xs text-red-500">
          This user posts NSFW content.
        </p>
      )}

      {/* Visit Profile Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Visit Profile
      </a>
    </div>
  );
};

export default RedditUserCard;
