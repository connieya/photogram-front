import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Authentication = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Authentication;
