import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import {
  UnlikeImage,
  addComment,
  deleteComment,
  fetchStorys,
  likeImage,
} from "../../../backend/api";
import { StoryData } from "../../../backend/entity";
import Comment from "../Comment";

const Story = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [storyList, setStoryList] = useState<StoryData[]>([]);
  const [likeEvent, setLikeEvent] = useState<boolean>(false);

  const fetch = async () => {
    const res = (await fetchStorys()).entity;
    if (res.code === 1) {
      setStoryList(res.data);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const clickLike = async (ImageId: number) => {
    const res = (
      await likeImage({
        id: ImageId,
      })
    ).entity;

    if (res.code === 1) {
      alert(res.message);
      setLikeEvent((prev) => !prev);
    }
  };

  const clickUnLike = async (ImageId: number) => {
    const res = (
      await UnlikeImage({
        id: ImageId,
      })
    ).entity;

    if (res.code === 1) {
      alert(res.message);
      setLikeEvent((prev) => !prev);
    }
  };

  const handleSubmit = async (ImageId: number) => {
    if (!content) {
      alert("댓글을 입력하세요");
      return;
    }
    const res = (
      await addComment({
        createPayload: {
          imageId: ImageId,
          content: content,
        },
      })
    ).entity;
    if (res.code === 1) {
      setContent("");
      fetch();
    }
  };

  const handleOnKeyPress = (e: any, imageId: number) => {
    if (e.key === "Enter") {
      handleSubmit(imageId);
    }
  };

  const deleteEvent = async (id: any) => {
    const res = (await deleteComment({ id: id })).entity;
    console.log("댓글 삭제 !!", res);
    if (res.code === 1) {
      alert(res.message);
      fetch();
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
      return;
    }
    fetch();
  }, [likeEvent]);

  useEffect(() => {}, [storyList]);

  return (
    <main className='main'>
      <section className='container'>
        <article className='story-list' id='storyList'>
          {storyList.map((story) => (
            <div className='story-list__item'>
              <div className='sl__item__header'>
                <div>
                  <img
                    src={
                      story.user.profileImageUrl
                        ? `/images/${story.user.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                    className='profile-image'
                    alt='프사'
                  />
                </div>

                <div
                  className='story-username'
                  onClick={() => navigate(`/user/${story.user.id}`)}
                >
                  {story.user.username}
                </div>
              </div>
              <div className='sl__item__img'>
                <img src={`/images/${story.postImageUrl}`} alt='업로드 사진' />
              </div>
              <div className='sl__item__contents'>
                <div className='sl__item__contents__icon'>
                  {story.likeState ? (
                    <button
                      onClick={() => {
                        clickUnLike(story.id);
                      }}
                    >
                      <i className='fas fa-heart active' id='storyLikeIcon'></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        clickLike(story.id);
                      }}
                    >
                      <i className='fas fa-heart' id='storyLikeIcon'></i>
                    </button>
                  )}
                </div>
                <span className='like'>
                  <b id='storyLikeCount'>{story.likeCount}</b>likes
                </span>
                <div className='sl__item__contents__content'>
                  <p>{story.caption}</p>
                </div>
                {story.comments.map((comment) => (
                  <Comment
                    comment={comment}
                    onClick={() => deleteEvent(comment.id)}
                  />
                ))}
                <div className='sl__item__input'>
                  <input
                    type='text'
                    placeholder='댓글 달기'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => handleOnKeyPress(e, story.id)}
                  />
                  <button type='button' onClick={() => handleSubmit(story.id)}>
                    게시
                  </button>
                </div>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default Story;
