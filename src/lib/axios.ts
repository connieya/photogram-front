import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // alert("토큰이 만료되었습니다. 다시 로그인 해주세요 ");
      // window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
