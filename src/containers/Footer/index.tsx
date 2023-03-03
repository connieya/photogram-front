import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className='container'>
          <ul>
            <li>
              <a href='#a'>소개</a>
            </li>
            <li>
              <a href='#a'>블로그</a>
            </li>
            <li>
              <a href='#a'>채용 정보</a>
            </li>
            <li>
              <a href='#a'>도움말</a>
            </li>
            <li>
              <a href='#a'>API</a>
            </li>
            <li>
              <a href='#a'>개인정보처리방침</a>
            </li>
            <li>
              <a href='#a'>약관</a>
            </li>
            <li>
              <a href='#a'>인기 계정</a>
            </li>
            <li>
              <a href='#a'>해시태그</a>
            </li>
            <li>
              <a href='#a'>위치</a>
            </li>
          </ul>
          <div className='copy'>
            <p>© 2023 Photogram from Cony</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
