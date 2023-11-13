import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { followUser, unFollowUser } from "../../../../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../../../../recoil/user";
import { followFlag } from "../../../../recoil/follow";

type NameGroupProps = {
  nickname: string | undefined;
  isFollow: boolean | undefined;
};

const NameGroup = ({ nickname, isFollow }: NameGroupProps) => {
  const navigate = useNavigate();
  const [followState, setFollowState] = useState<boolean | undefined>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = useRecoilValue(userInfoState);
  const [pageOwner, setPageOwner] = useState<Boolean>(false);
  const [flag, setFlag] = useRecoilState<Boolean>(followFlag);

  const params = useParams();

  const follow = async (id: number | undefined) => {
    const res = await followUser(id);
    console.log("res =>", res);
    if (res?.status === 200) {
      setFollowState(true);
      setFlag((prev) => !prev);
      alert(res?.data.message);
    }
  };

  const unfollow = async (id: number | undefined) => {
    const res = await unFollowUser(id);
    console.log("res =>", res);
    if (res?.status === 200) {
      setFollowState(false);
      setFlag((prev) => !prev);
      alert(res?.data.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/signin");
  };

  useEffect(() => {
    console.log("팔로우 여부 => ", isFollow);
    setFollowState(isFollow);
    setPageOwner(Number(params.userId) === userId);
  }, [isFollow]);

  return (
    <>
      <NameGroupBox>
        <h2>{nickname}</h2>
        {pageOwner ? (
          <Button onClick={() => navigate("/upload")}>게시물 등록</Button>
        ) : followState ? (
          <BlueButton
            onClick={() => {
              unfollow(Number(params.userId));
            }}
          >
            팔로우 취소
          </BlueButton>
        ) : (
          <Button onClick={() => follow(Number(params.userId))}>
            팔로우 하기
          </Button>
        )}

        <ModalButton onClick={() => setIsModalOpen(true)}>
          <i className='fas fa-cog'></i>
        </ModalButton>
      </NameGroupBox>
      {isModalOpen ? (
        <ModalWrapper>
          <ModalBox>
            {pageOwner ? (
              <button
                onClick={() =>
                  navigate(`/user/${Number(params.userId)}/profile`)
                }
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
  margin-top: 1.2rem;
  margin-bottom: 1rem;
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
  z-index: 1;
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
