import React, { useContext, useEffect } from "react";

import "./header.css";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("헤더 =>", user);
  }, []);
  return (
    <div>
      <header className='header'>
        <div className='container'>
          <a href='/story' className='logo'>
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
                <a onClick={() => navigate("/image/popular")} href=''>
                  <i className='far fa-compass'></i>
                </a>
              </li>
              <li className='navi-item'>
                <a onClick={() => navigate(`/user/${user.id}`)} href=''>
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
