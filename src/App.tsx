import React from "react";
import "./App.css";
import Authentication from "./containers/Authentication";
import Main from "./components/Main";

function App() {
  return (
    <div className='App'>
      <Main />
      <Authentication />
    </div>
  );
}

export default App;
