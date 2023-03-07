import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";
import Story from "../Images/Story";
import Profile from "./Profile";
import User from "./User";
import Upload from "../Images/Upload";
import Layout from "../../containers/Layout";
import UserContext from "../../context/UserProvider";

const Main = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/:userId' element={<User />} />
          <Route path='/user/:userId/profile' element={<Profile />} />
          <Route path='/story' element={<Story />} />
          <Route path='/upload' element={<Upload />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
