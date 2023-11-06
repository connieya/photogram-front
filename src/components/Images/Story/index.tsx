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
import {
  Button,
  CommentsInfo,
  ContentsBox,
  ContentsWrappeIcon,
  ContentsWrapper,
  InputBox,
  ListItem,
  ListItemHeader,
  Main,
  ProfileImageBox,
  Section,
  Span,
  StoryList,
  UploadImageBox,
} from "./Story.styles";

const Story = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [storyList, setStoryList] = useState<StoryData[]>([]);
  const [likeEvent, setLikeEvent] = useState<boolean>(false);

  const fetch = async () => {
    const res = (await fetchStorys()).entity;
    console.log("피드 불러오기", res);
    if (res.code === 1) {
      setStoryList(res.data);
    } else {
      alert(res.message);
      navigate("/signin");
    }
  };

  const clickLike = async (ImageId: number) => {
    console.log("좋아요 클릭 ! ", ImageId);
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
    console.log("좋아요 취소 !", ImageId);
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
    <Main>
      <Section>
        <StoryList>
          {storyList.map((story) => (
            <ListItem>
              <ListItemHeader>
                <ProfileImageBox>
                  <img
                    src={
                      story.profileImageUrl
                        ? `/images/${story.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                    className='profile-image'
                    alt='프사'
                  />
                </ProfileImageBox>

                <div
                  className='story-username'
                  onClick={() => navigate(`/user/${story.userId}`)}
                >
                  {story.username}
                </div>
              </ListItemHeader>
              <UploadImageBox>
                <img src={`/images/${story.postImageUrl}`} alt='업로드 사진' />
              </UploadImageBox>
              <ContentsWrapper>
                <ContentsWrappeIcon>
                  {story.likeState ? (
                    <button
                      onClick={() => {
                        clickUnLike(story.imageId);
                      }}
                    >
                      <i className='fas fa-heart active' id='storyLikeIcon'></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        clickLike(story.imageId);
                      }}
                    >
                      <i className='fas fa-heart' id='storyLikeIcon'></i>
                    </button>
                  )}
                </ContentsWrappeIcon>
                <Span className='like'>
                  <b id='storyLikeCount'>좋아요{story.likeCount} 개</b>
                </Span>
                <ContentsBox>
                  <div>
                    <p>
                      <strong>{story.username}</strong>
                      &nbsp;
                      {story.caption}
                    </p>
                  </div>
                </ContentsBox>
                <CommentsInfo>
                  댓글{story.comments?.length}개 모두 보기
                </CommentsInfo>
                {/* {story.comments.map((comment) => (
                  <Comment
                    comment={comment}
                    onClick={() => deleteEvent(comment.contentId)}
                  />
                ))} */}
                <InputBox>
                  <input
                    type='text'
                    placeholder='댓글 달기'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => handleOnKeyPress(e, story.imageId)}
                  />
                  <Button
                    type='button'
                    onClick={() => handleSubmit(story.imageId)}
                  >
                    게시
                  </Button>
                </InputBox>
              </ContentsWrapper>
            </ListItem>
          ))}
        </StoryList>
      </Section>
    </Main>
  );
};

export default Story;
