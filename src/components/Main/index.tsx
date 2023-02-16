import React from "react";

import "./header.css";
import { Route, Routes } from "react-router-dom";
import Story from "../Story";
import logo from "../../assets/logo.jpg";

const Main = () => {
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
                <a href='/'>
                  <i className='fas fa-home'></i>
                </a>
              </li>
              <li className='navi-item'>
                <a href='/image/popular'>
                  <i className='far fa-compass'></i>
                </a>
              </li>
              <li className='navi-item'>
                <a href='/'>
                  <i className='far fa-user'></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Story />} />
      </Routes>
    </div>
  );
};

export default Main;
