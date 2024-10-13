import { useState } from "react";
import "./index.css";
import { Options } from "./components/subComponents";
import { DemoYT, DemoRE, Hero } from "./components";

function App() {
  const [platform, setPlatform] = useState("RE");
  // console.log(process.env);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-6 mx-auto max-w-7xl sm:px-16">
        <Hero />
        {/* options */}
        <Options
          platform={platform}
          setPlatform={setPlatform}
        />
        {platform === "YT" ? (
          <DemoYT platform={platform} />
        ) : (
          <DemoRE platform={platform} />
        )}
        {/* <Demo2 /> */}
      </div>
    </main>
  );
}

export default App;
