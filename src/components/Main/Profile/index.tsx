import React, { useState, useEffect } from "react";
import "./profile.css";
import { UserInfo } from "../../../backend/entity";
import { fetchUserProfileUpdate, updateProfile } from "../../../backend/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo>();
  const [nickname, setNickname] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [website, setWebsite] = useState<string>("");

  const fetchUser = async () => {
    const res = (await fetchUserProfileUpdate()).entity;
    if (res.code === 1) {
      console.log(res.data);
      setUser(res.data);
      setNickname(res.data.nickname);
      setBio(res.data.bio);
      setWebsite(res.data.website);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = (
      await updateProfile({
        createPayload: {
          nickname: nickname,
          website: website,
          bio: bio,
        },
      })
    ).entity;
    if (res.code === 1) {
      alert(res.message);
      navigate(`/user/${user?.id}`);
    }
    console.log("res =>", res);
  };

  return (
    <>
      <main className='main'>
        <section className='setting-container'>
          <article className='setting__content'>
            <div className='content-item__01'>
              <div className='item__img'>
                <img
                  src={
                    user?.profileImageUrl
                      ? `/images/${user?.profileImageUrl}`
                      : "/images/basic.jpg"
                  }
                />
              </div>
              <div className='item__username'>
                <h2>{user?.nickname}</h2>
              </div>
            </div>

            <form id='profileUpdate' onSubmit={handleSubmit}>
              <div className='content-item__02'>
                <div className='item__title'>닉네임</div>
                <div className='item__input'>
                  <input
                    type='text'
                    name='name'
                    placeholder='닉네임'
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className='content-item__03'>
                <div className='item__title'>아이디</div>
                <div className='item__input'>
                  <input
                    type='text'
                    name='username'
                    placeholder='아이디'
                    value={user?.username}
                    readOnly
                  />
                </div>
              </div>

              <div className='content-item__05'>
                <div className='item__title'>웹사이트</div>
                <div className='item__input'>
                  <input
                    type='text'
                    name='website'
                    placeholder='웹 사이트'
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='content-item__06'>
                <div className='item__title'>소개</div>
                <div className='item__input'>
                  <textarea
                    name='bio'
                    id=''
                    rows={3}
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  ></textarea>
                </div>
              </div>

              <div className='content-item__08'>
                <div className='item__title'>이메일</div>
                <div className='item__input'>
                  <input
                    type='text'
                    name='email'
                    placeholder='이메일'
                    value={user?.email}
                    readOnly
                  />
                </div>
              </div>
              <div className='content-item__07'>
                <div className='item__title'></div>
                <div className='item__input'>
                  <span>
                    <b>개인정보</b>
                  </span>{" "}
                  <span>
                    비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의
                    개인 정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.
                  </span>
                </div>
              </div>
              <div className='content-item__11'>
                <div className='item__title'></div>
                <div className='item__input'>
                  <button>제출</button>
                </div>
              </div>
            </form>
          </article>
        </section>
      </main>
    </>
  );
};

export default Profile;
