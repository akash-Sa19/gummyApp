import { arrowRightUp } from "../../assets";
import { formatDate } from "../../utils/formatDate";

const Card = ({ videoId, snippet }) => {
  //   console.log("id :", videoId, "snippet :", snippet);
  const {
    publishedAt,
    channelId,
    title,
    description,
    thumbnails,
    channelTitle,
    publishTime,
  } = snippet;
  const { high } = thumbnails;

  return (
    <div class="w-full p-6 bg-white rounded-lg shadow-md flex justify-between">
      {/* <!-- Video Section --> */}
      <div class="w-1/2">
        <iframe
          width="450"
          height="280"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video Title"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* <!-- Video Information Section --> */}
      <div class="w-1/2 pl-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p class="text-gray-600 mb-4">{description}</p>
        <p class="text-sm text-gray-500 mb-2">
          <span class="font-semibold">Published:</span>{" "}
          {formatDate(publishTime)}
        </p>
        <a
          href={`https://www.youtube.com/channel/${channelId}`}
          target="_blank"
        >
          <p class="text-sm text-gray-500 flex">
            <span class="font-semibold">Channel:</span> {channelTitle}{" "}
            <img
              width={"16px"}
              src={arrowRightUp}
              alt="link to channel"
            />
          </p>
        </a>
      </div>
    </div>
  );
};

export default Card;
