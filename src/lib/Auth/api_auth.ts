import { client } from "../../backend/axios";
import { SignInRequest } from "../../backend/entity";
import { SignUpReqDto } from "../type";

export const signUpUser = async (data: SignUpReqDto) => {
  return await client.post("/auth/signup", data);
};

export const signinUser = async (data: SignInRequest) => {
  return await client.post("/auth/signin", data);
};
