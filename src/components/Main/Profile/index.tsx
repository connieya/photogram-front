import React, { useState, useEffect } from "react";
import { UserInfo } from "../../../backend/entity";
import { fetchUserProfileUpdate, updateProfile } from "../../../backend/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    <ProfileLayout>
      <ProfileContainer>
        <ProfileWrapper>
          <ContentWrapper>
            <ImageBox>
              <Image
                src={
                  user?.profileImageUrl
                    ? `/images/${user?.profileImageUrl}`
                    : "/images/basic.jpg"
                }
              />
            </ImageBox>
            <ItemBox>
              <h2>{user?.nickname}</h2>
            </ItemBox>
          </ContentWrapper>

          <form id='profileUpdate' onSubmit={handleSubmit}>
            <ContentItemWrapper>
              <ItemTitle>닉네임</ItemTitle>
              <InputBox>
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
              </InputBox>
            </ContentItemWrapper>
            <ContentItemWrapper>
              <ItemTitle> 아이디</ItemTitle>
              <InputBox>
                <input
                  type='text'
                  name='username'
                  placeholder='아이디'
                  value={user?.username}
                  readOnly
                />
              </InputBox>
            </ContentItemWrapper>

            <ContentItemWrapper>
              <ItemTitle>웹사이트</ItemTitle>
              <InputBox>
                <input
                  type='text'
                  name='website'
                  placeholder='웹 사이트'
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
              </InputBox>
            </ContentItemWrapper>
            <ContentItemWrapper>
              <ItemTitle>소개</ItemTitle>
              <InputBox className='item__input'>
                <textarea
                  name='bio'
                  id=''
                  rows={3}
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                ></textarea>
              </InputBox>
            </ContentItemWrapper>

            <ContentItemWrapper>
              <ItemTitle>이메일</ItemTitle>
              <InputBox>
                <input
                  type='text'
                  name='email'
                  placeholder='이메일'
                  value={user?.email}
                  readOnly
                />
              </InputBox>
            </ContentItemWrapper>
            <ContentItemWrapper>
              <ItemTitle></ItemTitle>
              <InputBox>
                <span>
                  <b>개인정보</b>
                </span>{" "}
                <span>
                  비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인
                  정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.
                </span>
              </InputBox>
            </ContentItemWrapper>
            <ContentItemWrapper>
              <ItemTitle></ItemTitle>
              <InputBox>
                <button>제출</button>
              </InputBox>
            </ContentItemWrapper>
          </form>
        </ProfileWrapper>
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default Profile;

const ProfileLayout = styled.main`
  padding-top: 54px;
  background-color: #fafafa;
`;

const ProfileContainer = styled.section`
  width: 935px;
  margin: 0 auto;
  border: 1px solid gainsboro;
  margin-top: 30px;
  display: flex;
  border-radius: 4px;
`;

const ProfileWrapper = styled.article`
  border-left: 1px solid gainsboro;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  margin-right: 10%;
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  flex: 2;
  text-align: right;
  padding-right: 30px;
`;

const Image = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const ItemBox = styled.div`
  flex: 4;
`;

const ContentItemWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ItemTitle = styled.div`
  flex: 2;
  padding-right: 30px;
  text-align: right;
  font-size: 17px;
  font-weight: 600;
  padding-top: 7px;
`;

const InputBox = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  input {
    border: 1px solid #dbdbdb;
    height: 32px;
    padding: 0 10px;
    border-radius: 3px;
    font-size: 16px;
  }
  textarea {
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 16px;
  }
  span {
    color: #8e8e8e;
    font-size: 12px;
    padding-top: 10px;
  }
  button {
    border: 0;
    background-color: #0095f6;
    padding: 5px 9px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
`;
