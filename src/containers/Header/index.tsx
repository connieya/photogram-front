import React from "react";

import "./header.css";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className='header'>
        <div className='container'>
          <a href='/' className='logo'>
            <img src={logo} alt='' />
          </a>
          <nav className='navi'>
            <ul className='navi-list'>
              <li className='navi-item'>
                <a onClick={() => navigate("/story")} href=''>
                  <i className='fas fa-home'></i>
                </a>
              </li>
              <li className='navi-item'>
                <a href='/image/popular'>
                  <i className='far fa-compass'></i>
                </a>
              </li>
              <li className='navi-item'>
                <a onClick={() => navigate("/user/2")} href=''>
                  <i className='far fa-user'></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
