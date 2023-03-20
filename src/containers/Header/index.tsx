import React, { useContext, useEffect, useState } from "react";

import "./header.css";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserProvider";
import { UserInfo } from "../../backend/entity";
import { fetchUsers } from "../../backend/api";

const Header = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const { user } = useContext(UserContext);

  const getUserList = async () => {
    const res = (await fetchUsers()).entity;
    console.log("Res => ", res);
    if (res.code === 1) {
      setUserList(res.data);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div>
      <header className='header'>
        <div className='container'>
          <a href='/story' className='logo'>
            <img src={logo} alt='' />
          </a>

          <input
            className='search-bar'
            type='text'
            placeholder='사용자 검색'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />

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
        <div className='dropdown'>
          {query &&
            userList
              .filter((user) => {
                return user.username.match(query);
              })
              .map((user) => (
                <div className='dropdown-container' key={user.id}>
                  <img
                    src={
                      user.profileImageUrl
                        ? `/images/${user.profileImageUrl}`
                        : "/images/basic.jpg"
                    }
                    className='p-image'
                  />
                  <div
                    onClick={() => {
                      navigate(`/user/${user.id}`);
                      setQuery("");
                    }}
                    className='dropdown-row'
                  >
                    {user.username}
                  </div>
                </div>
              ))}
        </div>
      </header>
    </div>
  );
};

export default Header;
