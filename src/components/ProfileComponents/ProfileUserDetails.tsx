import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useRecoilValue } from "recoil";
import { loginUser } from "../../recoil/user";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../lib/User/apit_user";
import { userProfileResponse } from "../../lib/type";

const ProfileUserDetails = () => {
  const location = useLocation();
  const pathWithoutSlash = location.pathname.slice(1);
  const [userProfileInfo, setUserProfileInfo] = useState<userProfileResponse>();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const res = await getUserProfile(pathWithoutSlash);
    if (res.data.code === 1000) {
      setUserProfileInfo(res.data.result);
    }
    console.log("프로필 조회 res ", res);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="py-10 w-full  ">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p>{userProfileInfo?.username}</p>
            <button onClick={() => navigate("/account/edit")}>
              프로필 수정
            </button>
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
            <p className="font-semibold">{userProfileInfo?.name}</p>
            <p className="font-thin text-sm">😎 High rated gabru😉</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserDetails;
