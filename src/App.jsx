import { useState } from "react";
import "./App.css";
import Siparis from "./components/Siparis/Siparis";
import { Route, Switch } from "react-router-dom";

import Success from "./components/Approval/Approval";
import Main from "./components/Home/Home";

function App() {
  return (
    <Switch className="mai-component-container">
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/siparis">
        <Siparis />
      </Route>
      <Route exact path="/approval">
        <Success />
      </Route>
    </Switch>
  );
}

export default App;
