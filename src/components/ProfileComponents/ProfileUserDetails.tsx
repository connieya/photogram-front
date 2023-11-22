import React from "react";
import { TbCircleDashed } from "react-icons/tb";

const ProfileUserDetails = () => {
  return (
    <div className="py-10 w-full  ">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.pixabay.com/photo/2023/11/05/15/24/autumn-8367628_640.jpg"
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>username</p>
            <button>프로필 수정</button>
            <TbCircleDashed />
          </div>
          <div className="flex space-x-10">
            <div>
              <span>게시물 </span>
              <span className="font-semibold ml-1">10</span>
            </div>
            <div>
              <span>팔로워</span>
              <span className="font-semibold ml-1">5</span>
            </div>
            <div>
              <span>팔로잉</span>
              <span className="font-semibold ml-1">6</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">Full Name</p>
            <p className="font-thin text-sm">😎 High rated gabru😉</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserDetails;
