import { useState } from "react";
import "./App.css";
import Siparis from "./components/Siparis/Siparis";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <Siparis />
    </div>
  );
}

export default App;
