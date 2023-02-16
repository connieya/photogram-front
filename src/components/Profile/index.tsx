import React from "react";

const Profile = () => {
  return (
    <>
      <section className='profile'>
        <div className='profileContainer'>
          <div className='profile-left'>
            <div className='profile-img-wrap story-border'>
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
              <button className='modi'>
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
    </>
  );
};

export default Profile;
