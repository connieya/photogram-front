import { produceCreateAPI, produceReadAPI } from "./apiUtils";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserProfile,
  UserProfileResponse,
} from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, SignInResponse>(
  "auth/login"
);

export const SignUpUser = produceCreateAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);

export const fetchUseProfile = produceReadAPI<UserProfileResponse>("api/user");
