import React from "react";

import { Route, Routes } from "react-router-dom";
import Story from "../Images/Story";
import Profile from "./Profile";
import User from "./User";
import Upload from "../Images/Upload";
import Layout from "../../containers/Layout";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/:userId' element={<User />} />
          <Route path='/story' element={<Story />} />
          <Route path='/upload' element={<Upload />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
