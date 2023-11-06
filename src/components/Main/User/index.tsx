import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";
import {
  fetchUseProfile,
  followUser,
  unFollowUser,
} from "../../../backend/api";
import { FollowDto, UserProfile } from "../../../backend/entity";
import styled from "styled-components";
import NameGroup from "./NameGroup";
import ProfileImage from "./ProfileIMage";
import FollowInfo from "./FollowInfo";

const User = () => {
  const navigate = useNavigate();
  const [followState, setFollowState] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const params = useParams();

  const fetchData = async () => {
    const res = (await fetchUseProfile({ id: Number(params.userId) })).entity;
    console.log("유저 정보 => ", res);
    if (res.code === 1) {
      setUserInfo(res.data);
      setFollowState(res.data.followState);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  // useEffect(() => {
  //   fetchFollowerList();
  //   fetchData();
  //   console.log("!!!", followerListState);
  // }, [followerListState]);

  // useEffect(() => {
  //   fetchFollowingList();
  //   fetchData();
  // }, [followingListState]);

  // useEffect(() => {
  //   if (userInfo?.user.profileImageUrl) {
  //     const url = `/images/${userInfo?.user.profileImageUrl}`;
  //     setProfileUrl(url);
  //   }
  // }, [userInfo]);

  // useEffect(() => {
  //   fetchData();
  // }, [followState]);

  useEffect(() => {
    console.log("params =>", params);
    const token = sessionStorage.getItem("access_token");
    // fetchFollowerList();
    // fetchFollowingList();
    // console.log("@@@", followerListState);
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
            <ProfileImage userInfo={userInfo} />
          </ProfileLeftWrapper>
          <ProfileRightBox>
            <NameGroup />
            <FollowInfo userInfo={userInfo} />
            <UserInfoBox>
              <p>{userInfo?.user.bio}</p>
              <p>
                <a
                  href={userInfo?.user.website}
                  target='_blank'
                  rel='noreferrer'
                >
                  {userInfo?.user.website}
                </a>
              </p>
            </UserInfoBox>
          </ProfileRightBox>
        </ProfileContainer>
      </Section>
      <section id='tab-content'>
        <div className='profileContainer'>
          <div id='tab-1-content' className='tab-content-item show'>
            <div className='tab-1-content-inner'>
              {/* {userInfo?.user.images.map((image) => (
                <div className='img-box'>
                  <a href='/'>
                    <img src={`/images/${image.postImageUrl}`} />
                  </a>
                  <div className='comment'>
                    <a href='#' className=''>
                      <i className='fas fa-heart'></i>
                      <span>0</span>
                    </a>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>
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
