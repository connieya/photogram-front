import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/user";
import styled from "styled-components";
import { fetchUserList } from "../../lib/api";
import { UserInfo } from "../../lib/type";

const Header = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [query, setQuery] = useState<string>("");
  const userId = useRecoilValue(userInfoState);

  const getUserList = async () => {
    const response = await fetchUserList();
    console.log("Response = ", response);

    if (response.data.code === 1) {
      setUserList(response.data.data);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <HeaderLayout>
      <HeaderContainer>
        <Image src={logo} alt='홈' onClick={() => navigate("/story")} />

        <Input
          type='text'
          placeholder='사용자 검색'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        <IconContainer>
          <IconList>
            <IconItem>
              <IconWrapper onClick={() => navigate("/story")}>
                <i className='fas fa-home'></i>
              </IconWrapper>
            </IconItem>
            <IconItem>
              <IconWrapper onClick={() => navigate("/image/popular")}>
                <i className='far fa-compass'></i>
              </IconWrapper>
            </IconItem>
            <IconItem>
              <IconWrapper onClick={() => navigate(`/user/${userId}`)}>
                <i className='far fa-user'></i>
              </IconWrapper>
            </IconItem>
          </IconList>
        </IconContainer>
      </HeaderContainer>
      <DropdownContainer>
        {query &&
          userList
            .filter((user) => {
              return user.username.match(query);
            })
            .map((user) => (
              <DropdownWrapper key={user.id}>
                <ProfileImage
                  src={
                    user.profileImageUrl
                      ? `/images/${user.profileImageUrl}`
                      : "/images/basic.jpg"
                  }
                />
                <DropDownBox
                  onClick={() => {
                    navigate(`/user/${user.id}`);
                    setQuery("");
                  }}
                >
                  {user.username}
                </DropDownBox>
              </DropdownWrapper>
            ))}
      </DropdownContainer>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.header`
  height: 54px;
  background: #fff;
  width: 100%;
  border: 1px solid gainsboro;
  position: fixed;
  top: 0;
  z-index: 10;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 935px;
  margin: 0 auto;
  height: 100%;
`;

const Image = styled.img`
  display: flex;
  align-items: center;
  width: 120px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 37%;
  border: 1px solid #c0baba;
  display: inline-block;
  padding: 9px 4px 9px 40px;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
`;

const IconContainer = styled.nav``;

const IconList = styled.ul`
  display: flex;
`;

const IconItem = styled.li`
  flex: 1;
  text-align: center;
  margin: 0 15px;
  display: flex;
`;

const IconWrapper = styled.div`
  font-size: 22px;
  color: #808080;
  margin-top: 4px;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  display: block;
  width: 20%;
  margin: 0 auto;
  background-color: #fff;
`;

const DropdownWrapper = styled.div`
  margin: 0 auto;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const DropDownBox = styled.div`
  font-weight: 600;
  cursor: pointer;
`;
