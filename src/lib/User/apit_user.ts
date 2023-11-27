import { client } from "../axios";

const token = localStorage.getItem("access_token");
export const getUserProfile = async (username: string) => {
  console.log("프로필 조회 토큰 ", token);
  return await client.get(`/api/accounts/${username}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
};
