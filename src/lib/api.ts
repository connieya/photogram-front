import { AxiosResponse } from "axios";
import { client } from "../backend/axios";
import { SignInRequest, SignInResponse } from "../backend/entity";
const token = sessionStorage.getItem("access_token");

export const fetchUserImages = async (userId: number) => {
  return await client.get("/api/user/image", {
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

export const signinUser = async (
  data: SignInRequest
): Promise<AxiosResponse<SignInResponse>> => {
  try {
    return await client.post("/auth/signin", data);
  } catch (error: any) {
    console.log("e = ", error);
    alert(error?.response.data.message);
    throw error;
  }
};
