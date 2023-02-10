import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/intro' element={<Intro />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Intro />
    </div>
  );
}

export default App;
