import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import SignUp from "./components/SignUp";
import Header from "./containers/Header";
import Story from "./components/Story";
import Profile from "./components/Profile";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Header />}>
          <Route path='/' element={<Story />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/intro' element={<Intro />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
