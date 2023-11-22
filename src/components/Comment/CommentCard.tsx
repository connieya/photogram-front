import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const CommentCard = () => {
  const [isCommentLike, setIsCommentLike] = useState<boolean>(false);

  const handleLikeComment = () => {
    setIsCommentLike((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src="https://cdn.pixabay.com/photo/2020/03/10/16/47/moon-4919501_640.jpg"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">username</span>
              <span className="ml-2">nice post</span>
            </p>
            <div className="flex items-center spcaex-3 text-xs opacity-60 pt-2">
              <span>1 min ago</span>
              <span>좋아요 10개</span>
            </div>
          </div>
        </div>
        {isCommentLike ? (
          <AiFillHeart
            onClick={handleLikeComment}
            className="text-xs hover:opcacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-xs hover:opcacity-50 cursor-pointer "
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
