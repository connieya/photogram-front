import React, { useEffect } from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Post/PostCard";
import { useRecoilState } from "recoil";
import { loginUser } from "../../recoil/user";

const HomePage = () => {
  const [userInfo, setUserInfo] = useRecoilState(loginUser);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center">
        <div className="w-[44%] px-10">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            {[1, 2, 1, 1].map((item) => (
              <StoryCircle />
            ))}
          </div>

          <div className="space-y-10 w-full mt-10">
            {[1, 1, 1, 1, 1].map((itme) => (
              <PostCard />
            ))}
          </div>
        </div>
        <div className="w-[27%]">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
