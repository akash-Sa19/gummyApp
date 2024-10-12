import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // console.log(process.env);

  return (
    <>
      <p className="bg-red-600">{import.meta.env.VITE_GOOGLE_API_KEY}</p>
    </>
  );
}

export default App;
