import React, { useEffect, useState } from "react";
import { fetchPopular } from "../../../backend/api";
import { useNavigate } from "react-router-dom";
import { StoryData } from "../../../backend/entity";
import "./index.css";

const Popular = () => {
  const navigate = useNavigate();
  const [popularList, setPopularList] = useState<StoryData[]>([]);

  const fetchData = async () => {
    const res = (await fetchPopular()).entity;
    console.log("res => ", res);
    if (res.code === 1) {
      setPopularList(res.data);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='popular'>
      <div className='exploreContainer'>
        <div className='popular-gallery'>
          {popularList.map((image) => (
            <div className='gallery-container'>
              <div className='profile_header'>
                <div>
                  <img
                    src={
                      image.user.profileImageUrl
                        ? `/images/${image.user.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                    className='user-profile'
                    alt='프사'
                  />
                </div>
                <div
                  className='popular-username'
                  onClick={() => navigate(`/user/${image.user.id}`)}
                >
                  {image.user.username}
                </div>
              </div>
              <div className='img-box'>
                <img
                  className='p-img'
                  src={`/images/${image.postImageUrl}`}
                  alt='이미지'
                />
              </div>
              <p>좋아요 : {image.likeCount}개</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Popular;
