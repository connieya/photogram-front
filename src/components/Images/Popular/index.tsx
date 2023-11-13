import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ImagePopularDto } from "../../../lib/type";
import { fetchPopular } from "../../../lib/api";

const Popular = () => {
  const navigate = useNavigate();
  const [popularList, setPopularList] = useState<ImagePopularDto[]>([]);

  const fetchData = async () => {
    const res = await fetchPopular();
    setPopularList(res?.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <PopularContainer>
        <PopularWrapper>
          {popularList.map((image) => (
            <PopularList>
              <ProfileWrapper>
                <div>
                  <ProfileImage
                    src={
                      image.profileImageUrl
                        ? `/images/${image.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                    alt='프사'
                  />
                </div>
                <div
                  className='popular-username'
                  onClick={() => navigate(`/user/${image.userId}`)}
                >
                  {image.username}
                </div>
              </ProfileWrapper>
              <div className='img-box'>
                <Image src={`/images/${image.postImageUrl}`} alt='이미지' />
              </div>
              <p>좋아요 : {image.likeCount}개</p>
            </PopularList>
          ))}
        </PopularWrapper>
      </PopularContainer>
    </MainLayout>
  );
};

export default Popular;

const MainLayout = styled.main`
  width: 100%;
  padding-top: 84px;
  padding-bottom: 30px;
`;

const PopularContainer = styled.div`
  width: 850px;
  margin: 0 auto;
  height: 100%;
`;

const PopularWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
`;

const PopularList = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
`;
