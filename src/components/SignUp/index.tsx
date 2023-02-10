import React from "react";
import "../auth.css";

import logo from "../../assets/logo.jpg";

const SignUp = () => {
  return (
    <div className='container'>
      <main className='loginMain'>
        <section className='login'>
          <article className='login__form__container'>
            <div className='login__form'>
              <h1>
                <img src={logo} alt='로고' />
              </h1>

              <form
                className='login__input'
                action='/auth/signup'
                method='post'
              >
                <input
                  type='text'
                  name='username'
                  placeholder='아이디'
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='패스워드'
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='이메일'
                  required
                />
                <input
                  type='text'
                  name='nickname'
                  placeholder='닉네임'
                  required
                />
                <button>가입</button>
              </form>
            </div>

            <div className='login__register'>
              <span>계정이 있으신가요?</span>
              <a href='/intro'>로그인</a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
