import {
  produceCreateAPI,
  produceDeleteAPI,
  produceGetAPI,
  produceProfileAPI,
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
  UserProfileImageResponse,
  UserProfileResponse,
  UserProfileUpdateResponse,
} from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, SignInResponse>(
  "auth/signin"
);

export const SignUpUser = produceCreateAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);

export const fetchStorys = produceGetAPI<{}>("api/image");

export const fetchUseProfile = produceReadAPI<UserProfileResponse>("api/user");

export const fetchUserProfileUpdate =
  produceGetAPI<UserProfileUpdateResponse>("api/user/profile");

export const followUser = produceQueryAPI<FollowResponse>("api/subscribe");

export const unFollowUser = produceDeleteAPI<FollowResponse>("api/subscribe");

export const uploadProfileImage = produceProfileAPI<
  {},
  UserProfileImageResponse
>("api/user/image");

export const uploadFeed = produceUploadAPI<
  ImageUploadRequest,
  ImageUploadResponsee
>("api/image");
