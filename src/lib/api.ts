import { client } from "../backend/axios";
const user = sessionStorage.getItem("access_token");
export const fetchUserImages = async (userId: number) => {
  return await client.get("/api/user/image", {
    params: {
      userId,
    },

    headers: { Authorization: "Bearer " + user },
  });
};
