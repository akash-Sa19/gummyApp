const YouTubeChannelCard = ({ id, snippet, statistics }) => {
  const {
    title,
    description,
    publishedAt,
    thumbnails,
    defaultLanguage,
    country,
  } = snippet;

  const { subscriberCount, viewCount, videoCount } = statistics;

  const formattedDate = new Date(publishedAt).toLocaleDateString();

  return (
    <div className="flex w-full max-w-lg p-4 border rounded-lg shadow-md">
      {/* Thumbnail */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={thumbnails?.default?.url}
          alt={title}
          className="object-cover w-24 h-24 rounded-full"
        />
      </div>

      {/* Channel Information */}
      <div className="flex flex-col">
        {/* Channel Title (Clickable Link) */}
        <a
          href={`https://www.youtube.com/channel/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-blue-600 hover:underline"
        >
          {title}
        </a>

        {/* Description */}
        <p className="mb-2 text-sm text-gray-700">
          {description ? description : "No description available"}
        </p>

        {/* Published At, Language, Country */}
        <div className="mb-2 text-xs text-gray-600">
          <p>Published: {formattedDate}</p>
          {defaultLanguage && <p>Language: {defaultLanguage}</p>}
          {country && <p>Country: {country}</p>}
        </div>

        {/* Statistics */}
        <div className="flex flex-col space-y-1 text-sm text-gray-600">
          <p>
            Subscribers:{" "}
            {subscriberCount ? subscriberCount.toLocaleString() : "N/A"}
          </p>
          <p>Views: {viewCount ? viewCount.toLocaleString() : "N/A"}</p>
          <p>Videos: {videoCount ? videoCount.toLocaleString() : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeChannelCard;
