import React, { useEffect } from "react";
import "./index.css";
const Story = () => {
  useEffect(() => {
    console.log("@@", sessionStorage.getItem("access_token"));
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
