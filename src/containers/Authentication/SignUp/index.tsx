import React, { useState } from "react";
import "../auth.css";

import logo from "../../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../../../backend/api";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const navigate = useNavigate();

  const signup = async (e: any) => {
    e.preventDefault();
    const res = (
      await SignUpUser({
        createPayload: {
          username: username,
          password: password,
          email: email,
          nickname: nickname,
        },
      })
    ).entity;
    console.log("회원가입 결과 => ", res);
    alert(res.message);
    setUsername("");
    setPassword("");
    setEmail("");
    setNickname("");
    navigate("/signin");
    if (res.code === 1) {
    } else {
      console.log("회원가입 실패 ", res);
      alert(res.message);
    }
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

              <form className='login__input' onSubmit={signup} method='post'>
                <input
                  type='text'
                  name='username'
                  value={username}
                  maxLength={20}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder='아이디'
                  required
                />
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='패스워드'
                  required
                />
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='이메일'
                  required
                />
                <input
                  type='text'
                  name='nickname'
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder='닉네임'
                  required
                />
                <button type='submit'>가입</button>
              </form>
            </div>

            <div className='login__register'>
              <span>계정이 있으신가요?</span>
              <span className='auth__click' onClick={() => navigate("/signin")}>
                로그인
              </span>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
