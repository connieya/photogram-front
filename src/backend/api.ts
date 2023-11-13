import {
  produceAuthAPI,
  produceCreateAPI,
  produceDeleteAPI,
  produceGetAPI,
  produceProfileAPI,
  produceQueryAPI,
  produceReadAPI,
  produceUpdateProfileAPI,
  produceUploadAPI,
} from "./apiUtils";
import {
  CommentRequest,
  CommentResponse,
  FollowListResponse,
  FollowResponse,
  ImageUploadRequest,
  ImageUploadResponsee,
  LikesResponse,
  SignUpRequest,
  SignUpResponse,
  StoryResponse,
  UnLikesResponse,
  UserProfileImageResponse,
  UserProfileResponse,
  UserProfileUpdateResponse,
  UserUpdateRequest,
} from "./entity";

export const SignUpUser = produceAuthAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);

export const fetchStorys = produceGetAPI<StoryResponse>("api/image");

export const fetchUseProfile = produceReadAPI<UserProfileResponse>("api/user");

export const fetchUserProfileUpdate =
  produceGetAPI<UserProfileUpdateResponse>("api/user/profile");

export const followUser = produceQueryAPI<FollowResponse>("api/follow");

export const unFollowUser = produceDeleteAPI<FollowResponse>("api/follow");

export const likeImage = produceQueryAPI<LikesResponse>("api/likes");

export const UnlikeImage = produceDeleteAPI<UnLikesResponse>("api/likes");

export const uploadProfileImage = produceProfileAPI<
  {},
  UserProfileImageResponse
>("api/user/image");

export const uploadFeed = produceUploadAPI<
  ImageUploadRequest,
  ImageUploadResponsee
>("api/image");

export const updateProfile = produceUpdateProfileAPI<
  UserUpdateRequest,
  UserProfileUpdateResponse
>("api/user");

export const fetchFollower = produceReadAPI<FollowListResponse>("api/follower");
export const fetchFollowing =
  produceReadAPI<FollowListResponse>("api/following");

export const addComment = produceCreateAPI<CommentRequest, CommentResponse>(
  "api/comment"
);

export const deleteComment = produceDeleteAPI<CommentResponse>("api/comment");
