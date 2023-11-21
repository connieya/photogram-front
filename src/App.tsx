import React from "react";
import "./App.css";
import Authentication from "./containers/Authentication";
import Main from "./components/Main";
import Router from "./Pages/Router/Router";

function App() {
  return (
    <div className="App">
      <Router />
      {/* <Main />
      <Authentication /> */}
    </div>
  );
}

export default App;
