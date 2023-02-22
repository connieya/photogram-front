import React from "react";

import { Route, Routes } from "react-router-dom";
import Story from "./Story";
import logo from "../../assets/logo.jpg";
import Header from "../../containers/Header";
import Profile from "./Profile";
import User from "./User";

const Main = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/:userId' element={<User />} />
        <Route path='/' element={<Story />} />
      </Routes>
    </div>
  );
};

export default Main;
