import React, { useState } from "react";
import "../auth.css";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.jpg";

const Intro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signin = (e: any) => {
    e.preventDefault();
    console.log("로그인", username, password);
  };

  return (
    <div className='container'>
      <main className='loginMain'>
        <section className='login'>
          <article className='login__form__container'>
            <div className='login__form'>
              <h1>
                <img src={logo} alt='로고' />
              </h1>
              <form onSubmit={signin} className='login__input' method='post'>
                <input
                  type='text'
                  name='username'
                  placeholder='아이디'
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='비밀번호'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <button type='submit'>로그인</button>
              </form>

              <div className='login__horizon'>
                <div className='br'></div>
                <div className='or'>또는</div>
                <div className='br'></div>
              </div>

              <div className='login__facebook'>
                <button>
                  <i className='fab fa-facebook-square'></i>
                  <span>Facebook으로 로그인</span>
                </button>
              </div>
            </div>

            <div className='login__register'>
              <a href='/signup'>가입하기</a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Intro;
