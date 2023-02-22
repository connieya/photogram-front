import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import SignUp from "./components/SignUp";
import Header from "./containers/Header";
import Story from "./components/Story";
import Profile from "./components/Profile";
import User from "./components/User";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        {/* <Route element={<Header />}> */}
        <Route path='/' element={<Story />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/intro' element={<Intro />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
