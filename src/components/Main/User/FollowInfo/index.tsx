import React, { useState } from "react";
import styled from "styled-components";
import { FollowDto, UserProfile } from "../../../../backend/entity";
import {
  fetchFollower,
  fetchFollowing,
  followUser,
  unFollowUser,
} from "../../../../backend/api";
import { useNavigate } from "react-router-dom";

const FollowInfo = (props: { userInfo: UserProfile | undefined }) => {
  const { userInfo } = props;
  const navigate = useNavigate();
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followState, setFollowState] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [followerList, setFollowerList] = useState<FollowDto[]>();
  const [followingList, setFollowingList] = useState<FollowDto[]>();
  const [followerListState, setFollwerListState] = useState<boolean>(false);
  const [followingListState, setFollowingListState] = useState<boolean>(false);

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

  return (
    <div>
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

      {followerModal ? (
        <FollowerModalContainer>
          <FollowerModalWrapper>
            <FollowerModalHeader>
              <span>팔로워</span>
              <button onClick={() => setFollowerModal(false)}>
                <i className='fas fa-times'></i>
              </button>
            </FollowerModalHeader>
            <FollwerListContainer>
              {followerList?.map((follower) => (
                <FollwerListWrapper id={`subscribeModalItem-${follower.id}`}>
                  <FollowerImgBox>
                    <img
                      src={
                        follower.profileImageUrl
                          ? `/images/${follower.profileImageUrl}`
                          : "/images/basic.jpg"
                      }
                      alt='프로필'
                    />
                  </FollowerImgBox>
                  <FollowerTextBox
                    className='subscribed__text'
                    onClick={() => {
                      navigate(`/user/${follower.id}`);
                      window.location.reload();
                    }}
                  >
                    <h2>{follower.username}</h2>
                  </FollowerTextBox>
                  {!follower.equalUserState ? (
                    follower.followState ? (
                      <FollwerButtonBox>
                        <BlueButton
                          onClick={() => {
                            unfollow(follower.id);
                            setFollwerListState((prev) => !prev);
                          }}
                        >
                          팔로우 취소
                        </BlueButton>
                      </FollwerButtonBox>
                    ) : (
                      <FollwerButtonBox>
                        <Button
                          onClick={() => {
                            follow(follower.id);
                            setFollwerListState((prev) => !prev);
                          }}
                        >
                          팔로우 하기
                        </Button>
                      </FollwerButtonBox>
                    )
                  ) : (
                    ""
                  )}
                </FollwerListWrapper>
              ))}
            </FollwerListContainer>
          </FollowerModalWrapper>
        </FollowerModalContainer>
      ) : (
        ""
      )}

      {followingModal ? (
        <FollowerModalContainer>
          <FollowerModalWrapper>
            <FollowerModalHeader>
              <span>팔로잉</span>
              <button onClick={() => setFollowingModal(false)}>
                <i className='fas fa-times'></i>
              </button>
            </FollowerModalHeader>
            <FollwerListContainer>
              {followingList?.map((follower) => (
                <FollwerListWrapper id={`subscribeModalItem-${follower.id}`}>
                  <FollowerImgBox>
                    <img
                      src={
                        follower.profileImageUrl
                          ? `/images/${follower.profileImageUrl}`
                          : "/images/basic.jpg"
                      }
                      alt='프로필'
                    />
                  </FollowerImgBox>
                  <FollowerTextBox
                    onClick={() => {
                      navigate(`/user/${follower.id}`);
                      window.location.reload();
                    }}
                  >
                    <h2>{follower.username}</h2>
                  </FollowerTextBox>
                  {!follower.equalUserState ? (
                    follower.followState ? (
                      <FollwerButtonBox>
                        <BlueButton
                          onClick={() => {
                            unfollow(follower.id);
                            setFollowingListState((prev) => !prev);
                          }}
                        >
                          팔로우 취소
                        </BlueButton>
                      </FollwerButtonBox>
                    ) : (
                      <FollwerButtonBox>
                        <Button
                          onClick={() => {
                            follow(follower.id);
                            setFollowingListState((prev) => !prev);
                          }}
                        >
                          팔로우 하기
                        </Button>
                      </FollwerButtonBox>
                    )
                  ) : (
                    ""
                  )}
                </FollwerListWrapper>
              ))}
            </FollwerListContainer>
          </FollowerModalWrapper>
        </FollowerModalContainer>
      ) : (
        ""
      )}
    </div>
  );
};

export default FollowInfo;

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

const FollowerModalContainer = styled.div`
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

const FollowerModalWrapper = styled.div`
  width: 600px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const FollowerModalHeader = styled.div`
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  position: relative;
  button {
    position: absolute;
    right: 15px;
    top: 15px;
    background-color: transparent;
    border: 0;
  }
`;

const FollwerListContainer = styled.div`
  overflow: hidden;
  overflow-y: auto;
`;

const FollwerListWrapper = styled.div`
  display: flex;
  height: 70px;
  padding: 10px;
`;

const FollowerImgBox = styled.div`
  width: 80px;
  text-align: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const FollowerTextBox = styled.div`
  cursor: pointer;
  padding-top: 5px;
  h2 {
    font-size: 16px;
    line-height: 50px;
  }
`;

const FollwerButtonBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 10px 10px;
  border-radius: 4px;
  color: #262626;
  font-weight: bold;
  background: transparent;
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

const BlueButton = styled(Button)`
  background: #0095f6 !important;
  color: #fff !important;
`;

const FollowingModalContainer = styled.div``;
