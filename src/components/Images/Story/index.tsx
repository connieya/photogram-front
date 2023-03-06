import React, { useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { fetchStorys } from "../../../backend/api";
const Story = () => {
  const navigate = useNavigate();

  const fetch = async () => {
    const res = (await fetchStorys()).entity;
    console.log("게시글 리스트", res);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
      return;
    }
    fetch();
  }, []);

  return (
    <main className='main'>
      <section className='container'>
        <article className='story-list' id='storyList'>
          <div className='story-list__item'>
            <div className='sl__item_header'>
              <div>
                <img className='profile-image' alt='프사' />
              </div>
              <a href='/'>
                <div>코니</div>
              </a>
            </div>
            <div className='sl__item_img'>
              <img src='/' alt='업로드 사진' />
            </div>
            <div className='sl__item_contents'>
              <div className='sl__item__contents__icon'>
                <button>
                  <i className='fas fa-heart active'></i>
                </button>
              </div>
              <span className='like'>
                <b id='storyLikeCount'>10</b>likes
              </span>
              <div className='sl__item__contents__content'>
                <p>내용</p>
              </div>
              <div id='storyCommentList'>
                <div className='sl_item_contents__comment'>
                  <p>
                    <b>유저 아이디 :</b> 내용
                  </p>
                </div>
              </div>
              <div className='sl__item_input'>
                <input type='text' placeholder='댓글 달기' />
                <button type='button'>게시</button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Story;
