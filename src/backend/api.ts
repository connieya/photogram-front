import {
  produceCreateAPI,
  produceDeleteAPI,
  produceQueryAPI,
  produceReadAPI,
  produceUploadAPI,
} from "./apiUtils";
import {
  FollowResponse,
  ImageUploadRequest,
  ImageUploadResponsee,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserProfileResponse,
} from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, SignInResponse>(
  "auth/signin"
);

export const SignUpUser = produceCreateAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);

export const fetchUseProfile = produceReadAPI<UserProfileResponse>("api/user");

export const followUser = produceQueryAPI<FollowResponse>("api/subscribe");

export const unFollowUser = produceDeleteAPI<FollowResponse>("api/subscribe");

export const uploadFeed = produceUploadAPI<
  ImageUploadRequest,
  ImageUploadResponsee
>("api/image");
