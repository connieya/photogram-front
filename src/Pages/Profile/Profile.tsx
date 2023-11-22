import React from "react";
import ProfileUserDetails from "../../components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from "../../components/ProfileComponents/ReqUserPostPart";

const Profile = () => {
  return (
    <div className="px-20">
      <div className="">
        <ProfileUserDetails />
      </div>
      <div>
        <ReqUserPostPart />
      </div>
    </div>
  );
};

export default Profile;
