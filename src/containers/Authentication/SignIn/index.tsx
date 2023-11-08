import React, { useState } from "react";
import "../auth.css";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { FACEBOOK_AUTH_URL } from "../../../utils";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/user";
import { signinUser } from "../../../lib/api";
const Intro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const signin = async (e: any) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    const res = await signinUser(data);
    console.log("로그인 요청 ", res);
    if (res?.data.code === 1) {
      console.log("tqtqtqttqtqtqtq");
      sessionStorage.setItem(
        "access_token",
        res.data.data.tokenDto.accessToken
      );
      const id = res.data.data.userInfo.id;
      const nickname = res.data.data.userInfo.nickname;
      setUserInfo({ id, nickname });
      alert(res.data.message);
      navigate("/story");
    } else {
      alert(res.data.message);
      console.log("로그인 실패 ", res);
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
                <a href={FACEBOOK_AUTH_URL}>
                  <i className='fab fa-facebook-square'></i>
                  <span>Facebook으로 로그인</span>
                </a>
              </div>
            </div>

            <div className='login__register'>
              <span className='auth__click' onClick={() => navigate("/signup")}>
                가입하기
              </span>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Intro;
