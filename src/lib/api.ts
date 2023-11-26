import { AxiosResponse } from "axios";
import { client } from "../backend/axios";
import { SignInRequest, SignInResponse } from "../backend/entity";
import { SignUpReqDto } from "./type";
const token = sessionStorage.getItem("access_token");

export const fetchUserImages = async (userId: number | undefined) => {
  return await client.get("/api/user/images", {
    params: {
      userId,
    },

    headers: { Authorization: "Bearer " + token },
  });
};

export const followUser = async (id: number | undefined) => {
  try {
    return await client.post(`/api/follow/${id}`, null, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (e) {
    alert("오류가 발생했습니다.");
    console.log("error = ", e);
  }
};

export const unFollowUser = async (id: number | undefined) => {
  try {
    return await client.delete(`/api/follow/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (e) {
    alert("오류가 발생했습니다.");
    console.log("error = ", e);
  }
};

export const fetchUserList = async () => {
  return await client.get("/api/users", {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchUseProfile = async (id: number) => {
  return await client.get(`/api/user/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchPopular = async () => {
  return await client.get("/api/image/popular", {
    headers: { Authorization: "Bearer " + token },
  });
};
