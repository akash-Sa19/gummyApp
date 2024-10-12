import { useState } from "react";
import Hero from "./components/Hero";
import "./index.css";
import logo from "./assets/logo.svg";

function App() {
  const [count, setCount] = useState(0);
  // console.log(process.env);

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Hero />
      </div>
    </main>
  );
}

export default App;
