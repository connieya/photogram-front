import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FollowDto } from "../../../../backend/entity";
import {
  fetchFollower,
  fetchFollowing,
  followUser,
  unFollowUser,
} from "../../../../backend/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { followFlag } from "../../../../recoil/follow";

const FollowInfo = (props: { imgCount: number | undefined }) => {
  const { imgCount } = props;
  const navigate = useNavigate();
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [followerList, setFollowerList] = useState<FollowDto[]>();
  const [followingList, setFollowingList] = useState<FollowDto[]>();
  const params = useParams();
  const flag = useRecoilValue(followFlag);

  const fetchFollowerList = async () => {
    const res = (await fetchFollower({ id: Number(params.userId) })).entity;
    if (res.code === 1) {
      setFollowerList(res.data);
    }
  };

  const fetchFollowingList = async () => {
    const res = (await fetchFollowing({ id: Number(params.userId) })).entity;
    if (res.code === 1) {
      setFollowingList(res.data);
    }
  };

  const openFollowingModal = () => {
    setFollowingModal(true);
  };

  const openFollowerModal = () => {
    setFollowerModal(true);
  };

  const follow = async (id: number | undefined) => {
    const res = (await followUser({ id: id })).entity;
    if (res.code === 1) {
      alert(res.message);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const unfollow = async (id: number | undefined) => {
    const res = (await unFollowUser({ id: id })).entity;
    if (res.code === 1) {
      alert(res.message);
    }
  };

  useEffect(() => {
    fetchFollowerList();
    fetchFollowingList();
  }, []);

  useEffect(() => {
    fetchFollowerList();
  }, [flag]);

  return (
    <div>
      <FollowInfoBox>
        <FollowInfoList>
          <FollowInfoItem>
            게시물 <span>{imgCount}</span>
          </FollowInfoItem>
          <FollowInfoItem>
            팔로워{" "}
            <span onClick={() => openFollowerModal()}>
              {followerList?.length}
            </span>
          </FollowInfoItem>
          <FollowInfoItem>
            팔로잉{" "}
            <span onClick={() => openFollowingModal()}>
              {followingList?.length}
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
  z-index: 1;
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
