import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchUseProfile,
  followUser,
  unFollowUser,
} from "../../../../backend/api";
import { UserProfile } from "../../../../backend/entity";

const NameGroup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const [followState, setFollowState] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    }
  };

  const unfollow = async (id: number | undefined) => {
    const res = (await unFollowUser({ id: id })).entity;
    if (res.code === 1) {
      setFollowState(false);
      alert(res.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NameGroupBox>
        <h2>{userInfo?.nickname}</h2>
        {userInfo?.pageOwner ? (
          <Button onClick={() => navigate("/upload")}>게시물 등록</Button>
        ) : followState ? (
          <BlueButton
            onClick={() => {
              unfollow(userInfo?.userId);
            }}
          >
            팔로우 취소
          </BlueButton>
        ) : (
          <Button onClick={() => follow(userInfo?.userId)}>팔로우 하기</Button>
        )}

        <ModalButton onClick={() => setIsModalOpen(true)}>
          <i className='fas fa-cog'></i>
        </ModalButton>
      </NameGroupBox>
      {isModalOpen ? (
        <ModalWrapper>
          <ModalBox>
            {userInfo?.pageOwner ? (
              <button
                onClick={() => navigate(`/user/${userInfo?.userId}/profile`)}
              >
                회원정보 변경
              </button>
            ) : (
              " "
            )}

            <button onClick={logout}>로그아웃</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </ModalBox>
        </ModalWrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default NameGroup;

const NameGroupBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  h2 {
    font-weight: normal;
    font-family: "Montserrat", sans-serif;
    margin-right: 30px;
  }
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 10px;
  border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
  border-radius: 4px;
  color: #262626;
  font-weight: bold;
  background: transparent;
`;

const ModalButton = styled.button`
  border: none;
  background: none;
  i {
    font-size: 20px;
    padding: 8px;
  }
`;

const BlueButton = styled(Button)`
  background: #0095f6 !important;
  color: #fff !important;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  button {
    border: 0;
    background-color: transparent;
    height: 48px;
    cursor: pointer;
  }
  button:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
  }
`;
