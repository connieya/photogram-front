import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { uploadProfileImage } from "../../../../backend/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../../recoil/user";

interface ProfileImageProps {
  profileImgUrl: string | undefined; // profileImgUrl을 props로 받기 위해 정의
}

const ProfileImage = ({ profileImgUrl }: ProfileImageProps) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<string>("");
  const [imageModal, setImageModal] = useState<boolean>(false);
  const fileUpload = useRef<HTMLInputElement>(null);
  const [profileUrl, setProfileUrl] = useState("/images/basic.jpg");
  const [pageOwner, setPageOwner] = useState<Boolean>(false);
  const userId = useRecoilValue(userInfoState);
  const params = useParams();

  const profileImageUpload = async () => {
    if (!pageOwner) {
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
      navigate(`/user/${Number(params.userId)}`);
      window.location.reload();
    }
  };

  useEffect(() => {
    setPageOwner(Number(params.userId) === userId);
    console.log("프로필 이미지 컴포넌트 ", profileImgUrl);
    if (profileImgUrl) {
      setProfileUrl(`/images/${profileImgUrl}`);
    }
  }, [profileImgUrl]);

  return (
    <>
      <ProfileWrapper>
        <ProfileBox onClick={() => setImageModal(true)}>
          <form id='userProfileImageForm'>
            <input
              ref={fileUpload}
              onChange={handleImageChange}
              type='file'
              name='profileImageFile'
              style={{ display: "none" }}
            />
          </form>
          <Image src={profileUrl} alt='프사' />
        </ProfileBox>
      </ProfileWrapper>
      {imageModal ? (
        <ModalWrapper>
          <ModalBox>
            <Text>프로필 사진 바꾸기</Text>
            <button
              onClick={() => {
                profileImageUpload();
              }}
            >
              사진 업로드
            </button>
            <button onClick={() => setImageModal(false)}>취소</button>
          </ModalBox>
        </ModalWrapper>
      ) : (
        ""
      )}
    </>
  );
};

export default ProfileImage;

const ProfileWrapper = styled.div`
  height: 100%;
  flex-basis: 40%;
  display: flex;
  justify-content: center;
`;

const ProfileBox = styled.div`
  width: 162px;
  height: 162px;
  padding: 6px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #f2eff3;
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
  button:nth-child(2) {
    font-weight: 600;
    color: #0095f6;
  }
  button:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
  }
`;

const Text = styled.p`
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  color: #222;
  font-size: 18px;
`;
