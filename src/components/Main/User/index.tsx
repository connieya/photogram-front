import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./user.css";
import { fetchUseProfile } from "../../../backend/api";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const params = useParams();
  console.log("userId", params.userId);

  const fetchData = async () => {
    const res = (await fetchUseProfile({ id: Number(params.userId) })).entity;
    console.log(res);
  };

  useEffect(() => {
    // fetchData();
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
              <h2>코니</h2>
              <button className='cta'>사진등록</button>
              <button className='cta'>팔로우 하기</button>
              <button className='modi' onClick={() => setIsModalOpen(true)}>
                <i className='fas fa-cog'></i>
              </button>
            </div>
            <div className='subscribe'>
              <ul>
                <li>
                  게시물 <span>2</span>
                </li>
                <li>
                  팔로워 <span>5</span>
                </li>
                <li>
                  팔로잉 <span>4</span>
                </li>
              </ul>
            </div>
            <div className='state'>
              <h4></h4>
              <h4></h4>
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
        <div className='modal'>
          <button>회원정보 변경</button>
          <button>로그아웃</button>
          <button onClick={() => setIsModalOpen(false)}>취소</button>
        </div>
      </div>

      <div className={imageModal ? "modal-image" : ""}>
        <div className='modal'>
          <p>프로필 사진 바꾸기</p>
          <button>사진 업로드</button>
          <button onClick={() => setImageModal(false)}>취소</button>
        </div>
      </div>
    </>
  );
};

export default User;
