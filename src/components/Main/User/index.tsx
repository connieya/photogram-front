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

  useEffect(() => {
    fetchFollowerList();
    fetchData();
    console.log("!!!", followerListState);
  }, [followerListState]);

  useEffect(() => {
    fetchFollowingList();
    fetchData();
  }, [followingListState]);

  useEffect(() => {
    if (userInfo?.user.profileImageUrl) {
      const url = `/images/${userInfo?.user.profileImageUrl}`;
      setProfileUrl(url);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchData();
  }, [followState]);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    fetchFollowerList();
    fetchFollowingList();
    console.log("@@@", followerListState);
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <section className='profile'>
        <div className='profileContainer'>
          <div className='profile-left'>
            <div
              className='profile-img-wrap story-border'
              onClick={() => setImageModal(true)}
            >
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
            </div>
          </div>
          <div className='profile-right'>
            <div className='name-group'>
              <h2>{userInfo?.user.nickname}</h2>
              {userInfo?.pageOwner ? (
                <button className='cta' onClick={() => navigate("/upload")}>
                  게시물 등록
                </button>
              ) : followState ? (
                <button
                  className='cta blue'
                  onClick={() => {
                    unfollow(userInfo?.user.id);
                  }}
                >
                  팔로우 취소
                </button>
              ) : (
                <button
                  className='cta'
                  onClick={() => follow(userInfo?.user.id)}
                >
                  팔로우 하기
                </button>
              )}

              <button className='modi' onClick={() => setIsModalOpen(true)}>
                <i className='fas fa-cog'></i>
              </button>
            </div>
            <div className='subscribe'>
              <ul>
                <li>
                  게시물 <span>{userInfo?.imageCount}</span>
                </li>
                <li>
                  팔로워{" "}
                  <span onClick={() => openFollowerModal()}>
                    {userInfo?.followerCount}
                  </span>
                </li>
                <li>
                  팔로잉{" "}
                  <span onClick={() => openFollowingModal()}>
                    {userInfo?.followingCount}
                  </span>
                </li>
              </ul>
            </div>
            <div className='state'>
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
            </div>
          </div>
        </div>
      </section>
      <section id='tab-content'>
        <div className='profileContainer'>
          <div id='tab-1-content' className='tab-content-item show'>
            <div className='tab-1-content-inner'>
              {userInfo?.user.images.map((image) => (
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
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className={isModalOpen ? "modal-info" : "none"}>
        <div className={isModalOpen ? "modal" : "none"}>
          {userInfo?.pageOwner ? (
            <button
              onClick={() => navigate(`/user/${userInfo?.user.id}/profile`)}
            >
              회원정보 변경
            </button>
          ) : (
            " "
          )}

          <button onClick={logout}>로그아웃</button>
          <button onClick={() => setIsModalOpen(false)}>취소</button>
        </div>
      </div>

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
