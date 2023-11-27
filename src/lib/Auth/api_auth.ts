import { SignInRequest } from "../../backend/entity";
import { client } from "../axios";
import { SignUpReqDto } from "../type";

export const signUpUser = async (data: SignUpReqDto) => {
  return await client.post("/auth/signup", data);
};

export const signinUser = async (data: SignInRequest) => {
  return await client.post("/auth/signin", data);
};
