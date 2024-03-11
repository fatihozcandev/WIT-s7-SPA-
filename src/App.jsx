import { useState } from "react";
import "./App.css";
import Siparis from "./components/Siparis/Siparis";
import { Route, Switch } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Switch className="mai-component-container">
      <Route exact path="/"></Route>
      <Route exact path="/siparis">
        <Siparis />
      </Route>
    </Switch>
  );
}

export default App;
