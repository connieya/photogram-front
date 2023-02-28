import React from "react";

import { Route, Routes } from "react-router-dom";
import Story from "../Images/Story";
import Header from "../../containers/Header";
import Profile from "./Profile";
import User from "./User";
import Upload from "../Images/Upload";

const Main = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/:userId' element={<User />} />
        <Route path='/story' element={<Story />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </div>
  );
};

export default Main;
