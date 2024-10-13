// import { favicon } from "../assets/favicon.png";
import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center w-full">
      <nav className="flex items-center justify-between w-full pt-3 mb-10">
        <div className="flex items-baseline">
          <p className="mr-3 text-xl font-bold">Brainwave.io</p>
        </div>
        <button
          type="button"
          onClick={() => {
            window.open("https://github.com/akash-Sa19");
          }}
          className="rounded-full border border-black hover:border-white bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
        >
          GitHub
        </button>
      </nav>
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
        Research Articles, Video and Posts
        <br className="max-md:hidden" />
        <span className="text-transparent bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text">
          Brainwave.io
        </span>
      </h1>
      <h2 className="max-w-2xl mt-5 text-lg text-center text-gray-600 sm:text-xl">
        One step guide for all your research through articles, videos and posts
        from Youtube, Reddit and others
      </h2>
    </header>
  );
};

export default Hero;
