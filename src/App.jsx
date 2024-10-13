import { useState } from "react";
import Hero from "./components/Hero";
import "./index.css";
import Demo from "./components/Demo";

function App() {
  const [count, setCount] = useState(0);
  // console.log(process.env);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-6 mx-auto max-w-7xl sm:px-16">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}

export default App;
