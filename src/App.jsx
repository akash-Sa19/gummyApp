import { useState } from "react";
import "./index.css";
import { LoginForm, Options, RegisterForm } from "./components/subComponents";
import { DemoYT, DemoRE, Hero } from "./components";

function App() {
  const [platform, setPlatform] = useState("YT");
  const [formType, setFormType] = useState("register");

  // console.log(process.env);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-6 mx-auto max-w-7xl sm:px-16">
        <Hero />
        <Options
          platform={platform}
          setPlatform={setPlatform}
        />
        {platform === "YT" ? (
          <DemoYT platform={platform} />
        ) : (
          <DemoRE platform={platform} />
        )}
        <div className="absolute z-20 w-full h-full">
          {formType === "login" ? (
            <LoginForm setFormType={setFormType} />
          ) : formType === "register" ? (
            <RegisterForm setFormType={setFormType} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
