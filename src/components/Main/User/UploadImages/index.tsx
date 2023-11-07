import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserImageInfo } from "../../../../lib/type";
import { fetchUserImages } from "../../../../lib/api";

const UploadImages = (props: { userId: number }) => {
  const { userId } = props;
  const [userImages, setUserImages] = useState<UserImageInfo[]>();
  const fetchData = async () => {
    const images = await fetchUserImages(userId);
    console.log("이미지 들", images);
    setUserImages(images.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageContainer>
      <ImageWrapper>
        <ImageContent id='tab-1-content' className='tab-content-item show'>
          <ImageBox className='tab-1-content-inner'>
            {userImages?.map((image) => (
              <ImageList className='img-box'>
                <img src={`/images/${image.postImageUrl}`} alt='이미지' />
                <ImageItem className='comment'>
                  <i className='fas fa-heart'></i>
                  <span>{image.likeCount}</span>
                </ImageItem>
              </ImageList>
            ))}
          </ImageBox>
        </ImageContent>
      </ImageWrapper>
    </ImageContainer>
  );
};

export default UploadImages;

const ImageContainer = styled.section`
  width: 100%;
  margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 935px;
  margin: 0 auto;
  height: 100%;
`;

const ImageContent = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const ImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
`;

const ImageList = styled.div`
  position: relative;
  height: 293px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

const ImageItem = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    opacity: 1;
  }
  i {
    margin-right: 10px;
  }
  span {
    color: #fff;
  }
`;
