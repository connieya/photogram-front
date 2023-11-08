import React from "react";

import { Route, Routes } from "react-router-dom";
import Story from "../Images/Story";
import Profile from "./Profile";
import User from "./User";
import Upload from "../Images/Upload";
import Layout from "../../containers/Layout";
import Popular from "../Images/Popular";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/:userId' element={<User />} />
          <Route path='/user/:userId/profile' element={<Profile />} />
          <Route path='/story' element={<Story />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/image/popular' element={<Popular />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
