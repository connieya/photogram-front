import { client } from "../axios";
import { ImageUploadDto } from "../type";
const token = localStorage.getItem("access_token");

export const uploadImage = async (data: ImageUploadDto) => {
  console.log("이미지 업로드 token = ", token, data.token);
  return await client.post("/api/posts", data, {
    headers: {
      Authorization: "Bearer " + data.token,
      "Content-Type": "multipart/form-data",
    },
  });
};
