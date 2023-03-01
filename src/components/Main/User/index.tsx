import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./user.css";
import {
  fetchUseProfile,
  followUser,
  unFollowUser,
} from "../../../backend/api";
import { UserProfile } from "../../../backend/entity";

const User = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const params = useParams();
  console.log("userId", params.userId);

  const fetchData = async () => {
    const res = (await fetchUseProfile({ id: Number(params.userId) })).entity;
    if (res.code === 1) {
      setUserInfo(res.data);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    } else {
      fetchData();
    }
  }, []);

  const follow = async () => {
    const res = (await followUser({ id: userInfo?.user.id })).entity;
    console.log("팔로우 =>", res);
    if (res.code === 1) {
      alert(res.message);
      window.location.reload();
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const unfollow = async () => {
    const res = (await unFollowUser({ id: userInfo?.user.id })).entity;
    console.log("팔로우 취소 =>", res);
    if (res.code === 1) {
      alert(res.message);
      window.location.reload();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };
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
                  type='file'
                  name='profileImageFile'
                  style={{ display: "none" }}
                />
              </form>
              <img
                className='profile-image'
                src=''
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
                  사진등록
                </button>
              ) : userInfo?.subscribeState ? (
                <button className='cta blue' onClick={unfollow}>
                  팔로우 취소
                </button>
              ) : (
                <button className='cta' onClick={follow}>
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
                  팔로워 <span>{userInfo?.subscribedCount}</span>
                </li>
                <li>
                  팔로잉 <span>{userInfo?.subscribeCount}</span>
                </li>
              </ul>
            </div>
            <div className='state'>
              <h4>{userInfo?.user.bio}</h4>
              <h4>{userInfo?.user.website}</h4>
            </div>
          </div>
        </div>
      </section>
      <section id='tab-content'>
        <div className='profileContainer'>
          <div id='tab-1-content' className='tab-content-item show'>
            <div className='tab-1-content-inner'>
              <div className='img-box'>
                <a href='/'>
                  <img src='/' />
                </a>
                <div className='comment'>
                  <a href='#' className=''>
                    <i className='fas fa-heart'></i>
                    <span>6</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={isModalOpen ? "modal-info" : ""}>
        <div className={isModalOpen ? "modal" : ""}>
          <button>회원정보 변경</button>
          <button onClick={logout}>로그아웃</button>
          <button onClick={() => setIsModalOpen(false)}>취소</button>
        </div>
      </div>

      <div className={imageModal ? "modal-image" : ""}>
        <div className={imageModal ? "modal" : ""}>
          <p>프로필 사진 바꾸기</p>
          <button>사진 업로드</button>
          <button onClick={() => setImageModal(false)}>취소</button>
        </div>
      </div>
    </>
  );
};

export default User;
