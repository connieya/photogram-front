import React from "react";
import { useNavigate } from "react-router-dom";

const StoryCircle = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/story");
      }}
      className="cursor-pointer flex flex-col item-center"
    >
      <img
        className="w-16 h-16 rounded-full"
        src="https://cdn.pixabay.com/photo/2023/05/21/15/01/speicherstadt-8008681_640.jpg"
        alt=""
      />
      <p>username</p>
    </div>
  );
};

export default StoryCircle;
