import React from "react";
import SignIn from "../../components/Rester/SignIn";
import { useLocation } from "react-router-dom";
import SignUp from "../../components/Rester/SignUp";

const Auth = () => {
  const location = useLocation();
  return (
    <div className="">
      <div className="flex items-center justify-center h-[100vh] ">
        <div className=" w-[20vw]">
          {location.pathname === "/login" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
