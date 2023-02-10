import React from "react";
import "./intro.css";

import logo from "../../assets/logo.jpg";

const Intro = () => {
  return (
    <div className='container'>
      <main className='loginMain'>
        <section className='login'>
          <article className='login__form__container'>
            <div className='login__form'>
              <h1>
                <img src={logo} alt='로고' />
              </h1>
              <form action='' className='login__input'>
                <input
                  type='text'
                  name='username'
                  placeholder='아이디'
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='비밀번호'
                  required='required'
                />
                <button>로그인</button>
              </form>

              <div class='login__horizon'>
                <div class='br'></div>
                <div class='or'>또는</div>
                <div class='br'></div>
              </div>

              <div class='login__facebook'>
                <button>
                  <i class='fab fa-facebook-square'></i>
                  <span>Facebook으로 로그인</span>
                </button>
              </div>
            </div>

            <div class='login__register'>
              <span>계정이 없으신가요?</span>
              <a href='/auth/signup'>가입하기</a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Intro;
