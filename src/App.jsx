import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen bg-secondary-color relative py-24">
      <div className="w-full h-10 bg-primary-color shadow-nm absolute top-0"></div>
      <div class="">
        <div className="w-10 h-10 rounded-full bg-[#eae6ee] shadow-nm hover:shadow-nm-inset mx-auto mb-8 transition-all"></div>
      </div>
      <div className="w-64 h-56 rounded-lg bg-secondary-color shadow-nm hover:shadow-nm-inset mx-auto mb-8 transition-all flex justify-center items-end">
        <Button
        classes="rounded-full"
        >Sign Up</Button>
      </div>
    </div>
  );
}

export default App;
