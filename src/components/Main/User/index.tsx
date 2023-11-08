import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NameGroup from "./NameGroup";
import ProfileImage from "./ProfileIMage";
import FollowInfo from "./FollowInfo";
import UploadImages from "./UploadImages";
import { UserProfileInfo } from "../../../lib/type";
import { fetchUseProfile } from "../../../lib/api";

const User = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserProfileInfo>();
  const [userId, setUserId] = useState<number>();
  const params = useParams();

  const fetchData = async () => {
    const res = await fetchUseProfile(Number(params.userId));

    console.log("유저 정보 => ", res.data.data);
    if (res.data.code === 1) {
      setUserInfo(res.data.data);
    } else {
      alert(res.data.message);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setUserId(Number(params.userId));
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <Section>
        <ProfileContainer>
          <ProfileLeftWrapper>
            <ProfileImage profileImgUrl={userInfo?.profileImageUrl} />
          </ProfileLeftWrapper>
          <ProfileRightBox>
            <NameGroup
              nickname={userInfo?.nickname}
              isFollow={userInfo?.followState}
            />
            <FollowInfo imgCount={userInfo?.imageCount} />
            <UserInfoBox>
              <p>{userInfo?.bio}</p>
              <p>
                <a href={userInfo?.website} target='_blank' rel='noreferrer'>
                  {userInfo?.website}
                </a>
              </p>
            </UserInfoBox>
          </ProfileRightBox>
        </ProfileContainer>
      </Section>
      <UploadImages userId={userId} />
    </>
  );
};

export default User;

const Section = styled.section`
  height: 170px;
  display: flex;
  margin: 54px 0 44px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 935px;
  margin: 0 auto;
  height: 100%;
`;

const ProfileLeftWrapper = styled.div`
  height: 100%;
  flex-basis: 40%;
  display: flex;
  justify-content: center;
`;

const ProfileRightBox = styled.div`
  height: 100%;
  flex-basis: 60%;
`;

const UserInfoBox = styled.div`
  float: left;
  margin-bottom: 2px;
`;
