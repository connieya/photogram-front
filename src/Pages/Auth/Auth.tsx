import React from "react";
import styled from "styled-components";
import SignIn from "../../components/Rester/SignIn";
import { useLocation } from "react-router-dom";
import SignUp from "../../components/Rester/SignUp";

const Auth = () => {
  const location = useLocation();
  return (
    <div className="">
      <div className="flex items-center justify-center h-[100vh] space-x-5">
        <div className="relative hidden lg:block border">
          <div className="h-[35.3rem] w-[23rem]">
            <img
              className="h-full w-full"
              src="https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814080_640.png"
              alt=""
            />
            <MobileWrapper></MobileWrapper>
          </div>
        </div>
        <div className=" w-[23vw]">
          {location.pathname === "/login" ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Auth;

const MobileWrapper = styled.div`
  background-image: url("");
`;
