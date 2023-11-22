import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDots,
  BsEmojiSmile,
} from "react-icons/bs";
import "./PostCard.css";

const PostCard = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>();
  const [isPostLiked, setIsPostLiked] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>();

  const handleSavePost = () => {
    setIsSaved((prev) => !prev);
  };

  const handlePostLike = () => {
    setIsPostLiked((prev) => !prev);
  };

  const handleClick = () => {
    setShowDropDown((prev) => !prev);
  };
  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src="https://cdn.pixabay.com/photo/2023/11/10/17/10/jack-russell-8379770_640.jpg"
              alt=""
            />
            <div className="pl-2">
              <p className="font-semibold text-sm">username</p>
              <p className="font-thin text-sm">location</p>
            </div>
          </div>
          <div className="dropdown">
            <BsThreeDots
              onClick={handleClick}
              className="dots cursor-pointer"
            />
            <div className="dropdown-content">
              {showDropDown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full"
            src="https://cdn.pixabay.com/photo/2014/03/26/21/00/climber-299018_640.jpg"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLiked ? (
              <AiFillHeart
                onClick={handlePostLike}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={handlePostLike}
                className="text-2xl hover:opacity-50 cursor-pointer"
              />
            )}
            <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-full py-2 px-5">
          <p>좋아요 10</p>
          <p className="opacity-50 py-2 cursor-pointer">댓글 10개 모두 보기</p>
        </div>
        <div className="border border-t w-full">
          <div className="flex w-full items-center">
            <BsEmojiSmile />
            <input
              className="commentInput"
              type="text"
              placeholder="댓글 작성하기..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
