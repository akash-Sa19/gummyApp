import React from "react";
import { formatDate } from "../../utils/formatDate";

const YouTubeCard = ({ id, snippet, statistics }) => {
  const { title, description, channelTitle, thumbnails, publishedAt } = snippet;
  const { viewCount, likeCount, commentCount } = statistics;

  return (
    <div className="flex max-w-3xl p-4 border border-gray-300 rounded-lg shadow-md">
      {/* Video Thumbnail */}
      <div className="w-1/3 mr-4">
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="rounded-md"
            src={thumbnails?.high?.url || thumbnails?.medium?.url}
            alt={title}
          />
        </a>
      </div>

      {/* Video Details */}
      <div className="w-2/3">
        {/* Video Title */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>

        {/* Channel Title */}
        <p className="mb-1 text-sm text-gray-600">
          Channel: <span className="font-medium">{channelTitle}</span>
        </p>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-700 line-clamp-3">{description}</p>

        {/* Video Stats */}
        <div className="flex space-x-6 text-sm text-gray-600">
          <div>
            <strong className="text-gray-900">{viewCount}</strong> views
          </div>
          <div>
            <strong className="text-gray-900">{likeCount}</strong> likes
          </div>
          <div>
            <strong className="text-gray-900">{commentCount}</strong> comments
          </div>
          <div>
            <p>Published on {formatDate(publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeCard;
