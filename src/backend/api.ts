import { produceCreateAPI, produceQueryAPI, produceReadAPI } from "./apiUtils";
import {
  FollowResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserProfileResponse,
} from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, SignInResponse>(
  "auth/login"
);

export const SignUpUser = produceCreateAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);

export const fetchUseProfile = produceReadAPI<UserProfileResponse>("api/user");

export const followUser = produceQueryAPI<FollowResponse>("api/subscribe");
