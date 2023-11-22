import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import CommentCard from "./CommentCard";
import "./CommentModal.css";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  isPostLiked?: boolean;
  handlePostLike: () => void;
  handleSavePost: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  isSaved,
  isPostLiked,
  handlePostLike,
  handleSavePost,
}) => {
  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full w-full"
                  src="https://cdn.pixabay.com/photo/2017/04/20/20/27/ski-race-2246889_640.jpg"
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10">
                <div className="flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src="https://cdn.pixabay.com/photo/2013/03/19/18/23/mountain-biking-95032_640.jpg"
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <p>username</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>
                <hr />
                <div className="comment">
                  {[1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                    <CommentCard />
                  ))}
                </div>
                <div className="flex justify-between items-center w-full  py-4">
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
                <div className="w-full py-2 ">
                  <p>좋아요 10</p>
                  <p className="opacity-50 text-sm">1일</p>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
