import githubIcon from "../../../assets/githubIcon.svg";
import googleIcon from "../../../assets/googleIcon.svg";

const OAuthComponent = () => {
  return (
    <div className="flex w-full gap-4 mt-6">
      <button className="flex items-center justify-center w-1/2 border border-gray-400 rounded-md shadow-lg">
        <img
          src={googleIcon}
          className="w-6 h-6 m-1.5"
        />
      </button>
      <button className="flex items-center justify-center w-1/2 border border-gray-400 rounded-md shadow-lg">
        <img
          src={githubIcon}
          className="w-6 h-6 m-1.5"
        />
      </button>
    </div>
  );
};

export default OAuthComponent;
