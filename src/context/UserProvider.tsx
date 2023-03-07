import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { UserInfo } from "../backend/entity";

const userAuth = {
  id: 0,
  usermame: "",
  nickname: "",
  website: "",
  bio: "",
  profileImageUrl: "",
  images: [],
};

export interface UserContextInterface {
  user: UserInfo;
  setUser: Dispatch<SetStateAction<UserInfo>>;
}

const defaultState = {
  user: {},
  setUser: (user: UserInfo) => {},
} as UserContextInterface;

const UserContext = React.createContext(defaultState);

type UserProvideProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProvideProps) {
  const [user, setUser] = useState<UserInfo>(userAuth);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
