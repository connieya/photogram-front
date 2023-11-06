import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";
import {
  fetchFollower,
  fetchFollowing,
  fetchUseProfile,
  followUser,
  unFollowUser,
  uploadProfileImage,
} from "../../../backend/api";
import { FollowDto, UserProfile } from "../../../backend/entity";
import styled from "styled-components";
import NameGroup from "./NameGroup";

const User = () => {
  const navigate = useNavigate();
  const fileUpload = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [followState, setFollowState] = useState<boolean>(false);
  const [followerListState, setFollwerListState] = useState<boolean>(false);
  const [followingListState, setFollowingListState] = useState<boolean>(false);
  const [profileUrl, setProfileUrl] = useState("/images/basic.jpg");
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const [followerList, setFollowerList] = useState<FollowDto[]>();
  const [followingList, setFollowingList] = useState<FollowDto[]>();
  const params = useParams();

  const fetchData = async () => {
    const res = (await fetchUseProfile({ id: Number(params.userId) })).entity;
    if (res.code === 1) {
      setUserInfo(res.data);
      setFollowState(res.data.followState);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const follow = async (id: number | undefined) => {
    const res = (await followUser({ id: id })).entity;
    if (res.code === 1) {
      setFollowState(true);
      alert(res.message);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const unfollow = async (id: number | undefined) => {
    const res = (await unFollowUser({ id: id })).entity;
    if (res.code === 1) {
      setFollowState(false);
      alert(res.message);
    }
  };

  const profileImageUpload = async () => {
    if (!userInfo?.pageOwner) {
      alert("권한이 없습니다.");
      return;
    }
    fileUpload.current?.click();
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);
    const res = (
      await uploadProfileImage({
        createPayload: formData,
      })
    ).entity;
    if (res.code === 1) {
      setImageModal(false);
      navigate(`/user/${userInfo?.user.id}`);
      window.location.reload();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };

  const fetchFollowerList = async () => {
    const res = (await fetchFollower({ id: userInfo?.user.id })).entity;
    console.log("팔로워 리스트", res);
    if (res.code === 1) {
      setFollowerList(res.data);
    }
  };

  const fetchFollowingList = async () => {
    const res = (await fetchFollowing({ id: userInfo?.user.id })).entity;
    console.log("팔로잉 리스트", res);
    if (res.code === 1) {
      setFollowingList(res.data);
    }
  };

  const openFollowingModal = () => {
    setFollowingModal(true);
    fetchFollowingList();
  };

  const openFollowerModal = () => {
    setFollowerModal(true);
    fetchFollowerList();
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
            <ProfileLeftBox onClick={() => setImageModal(true)}>
              <form id='userProfileImageForm'>
                <input
                  ref={fileUpload}
                  onChange={handleImageChange}
                  type='file'
                  name='profileImageFile'
                  style={{ display: "none" }}
                />
              </form>
              <img
                className='profile-image'
                src={profileUrl}
                alt='프사'
                id='userProfileImage'
              />
            </ProfileLeftBox>
          </ProfileLeftWrapper>
          <ProfileRightBox>
            <NameGroup />
            <FollowInfoBox>
              <FollowInfoList>
                <FollowInfoItem>
                  게시물 <span>{userInfo?.imageCount}</span>
                </FollowInfoItem>
                <FollowInfoItem>
                  팔로워{" "}
                  <span onClick={() => openFollowerModal()}>
                    {userInfo?.followerCount}
                  </span>
                </FollowInfoItem>
                <FollowInfoItem>
                  팔로잉{" "}
                  <span onClick={() => openFollowingModal()}>
                    {userInfo?.followingCount}
                  </span>
                </FollowInfoItem>
              </FollowInfoList>
            </FollowInfoBox>
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

      <div className={imageModal ? "modal-image" : "none"}>
        <div className={imageModal ? "modal" : "none"}>
          <p>프로필 사진 바꾸기</p>
          <button
            onClick={() => {
              profileImageUpload();
            }}
          >
            사진 업로드
          </button>
          <button onClick={() => setImageModal(false)}>취소</button>
        </div>
      </div>

      <div className={followerModal ? "modal-subscribed" : "none"}>
        <div className='subscribed'>
          <div className='subscribed-header'>
            <span>팔로워</span>
            <button onClick={() => setFollowerModal(false)}>
              <i className='fas fa-times'></i>
            </button>
          </div>
          <div className='subscribed-list' id='subscribedModalList'>
            {followerList?.map((follower) => (
              <div
                className='subscribed__item'
                id={`subscribeModalItem-${follower.id}`}
              >
                <div className='subscribed__img'>
                  <img
                    src={
                      follower.profileImageUrl
                        ? `/images/${follower.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                  />
                </div>
                <div
                  className='subscribed__text'
                  onClick={() => {
                    navigate(`/user/${follower.id}`);
                    window.location.reload();
                  }}
                >
                  <h2>{follower.username}</h2>
                </div>
                {!follower.equalUserState ? (
                  follower.followState ? (
                    <div className='subscribed__btn'>
                      <button
                        className='cta blue'
                        onClick={() => {
                          unfollow(follower.id);
                          setFollwerListState((prev) => !prev);
                        }}
                      >
                        팔로우 취소
                      </button>
                    </div>
                  ) : (
                    <div className='subscribed__btn'>
                      <button
                        className='cta'
                        onClick={() => {
                          follow(follower.id);
                          setFollwerListState((prev) => !prev);
                        }}
                      >
                        팔로우 하기
                      </button>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={followingModal ? "modal-subscribe" : "none"}>
        <div className='subscribe'>
          <div className='subscribe-header'>
            <span>팔로잉</span>
            <button onClick={() => setFollowingModal(false)}>
              <i className='fas fa-times'></i>
            </button>
          </div>
          <div className='subscribe-list' id='subscribeModalList'>
            {followingList?.map((follower) => (
              <div
                className='subscribe__item'
                id={`subscribeModalItem-${follower.id}`}
              >
                <div className='subscribe__img'>
                  <img
                    src={
                      follower.profileImageUrl
                        ? `/images/${follower.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                  />
                </div>
                <div
                  className='subscribe__text'
                  onClick={() => {
                    navigate(`/user/${follower.id}`);
                    window.location.reload();
                  }}
                >
                  <h2>{follower.username}</h2>
                </div>
                {!follower.equalUserState ? (
                  follower.followState ? (
                    <div className='subscribe__btn'>
                      <button
                        className='cta blue'
                        onClick={() => {
                          unfollow(follower.id);
                          setFollowingListState((prev) => !prev);
                        }}
                      >
                        팔로우 취소
                      </button>
                    </div>
                  ) : (
                    <div className='subscribe__btn'>
                      <button
                        className='cta'
                        onClick={() => {
                          follow(follower.id);
                          setFollowingListState((prev) => !prev);
                        }}
                      >
                        팔로우 하기
                      </button>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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

const ProfileLeftBox = styled.div`
  width: 162px;
  height: 162px;
  padding: 6px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #f2eff3;
  }
`;

const ProfileRightBox = styled.div`
  height: 100%;
  flex-basis: 60%;
`;

const FollowInfoBox = styled.div`
  height: 28px;
  margin-bottom: 5px;
`;

const FollowInfoList = styled.ul`
  display: flex;
`;

const FollowInfoItem = styled.li`
  font-weight: 50;
  margin-right: 18px;
  span {
    cursor: pointer;
    font-weight: 650;
    margin-left: 4px;
  }
`;

const UserInfoBox = styled.div`
  float: left;
  margin-bottom: 2px;
`;
