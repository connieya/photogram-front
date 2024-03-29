export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
}

export interface SignUpResponse {
  code: number;
  message: string;
  data: object;
}

export interface TokenDto {
  accessToken: string;
  grantType: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}

export interface UserAuth {
  tokenDto: TokenDto;
  // user: UserInfo;
  userInfo: UserInfo;
}

export interface SignInResponse {
  code: number;
  message: string;
  data: UserAuth;
}

export interface FollowResponse {
  code: number;
  message: string;
  data: TokenDto;
}

export interface UnfollowResponse {
  code: number;
  message: string;
  data: TokenDto;
}

export interface LikesResponse {
  code: number;
  message: string;
  data: null;
}

export interface UnLikesResponse {
  code: number;
  message: string;
  data: null;
}

export interface Comment {
  contentId: number;
  content: string;
  userId: number;
  username: string;
}

export interface StoryData {
  profileImageUrl: string;
  userId: number;
  postImageUrl: string;
  caption: string;
  username: boolean;
  imageId: number;
  likeState: boolean;
  likeCount: number;
  comments: Comment[];
}

export interface Image {
  id: number;
  caption: string;
  postImageUrl: string;
}

export interface StoryResponse {
  code: number;
  message: string;
  data: StoryData[];
}

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  website: string;
  bio: string;
  profileImageUrl: string;
  email: string;
  images: Image[];
}

export interface UserProfile {
  pageOwner: boolean;
  imageCount: number;
  followState: boolean;
  followingCount: number;
  followerCount: number;
  bio: string;
  website: string;
  userId: number;
  nickname: string;
  // user: UserInfo;
}

export interface ImageUploadRequest {
  file: string;
  caption: string;
}

export interface ImageUploadResponsee {
  code: number;
  message: string;
  data: number;
}

export interface UserProfileResponse {
  code: number;
  message: string;
  data: UserProfile;
}

export interface UserProfileUpdateResponse {
  code: number;
  message: string;
  data: UserInfo;
}

export interface UserProfileImageResponse {
  code: number;
  message: string;
  data: null;
}

export interface FollowDto {
  id: number;
  username: string;
  profileImageUrl: string;
  followState: boolean;
  equalUserState: boolean;
}

export interface FollowListResponse {
  code: number;
  message: string;
  data: FollowDto[];
}

export interface UserUpdateRequest {
  nickname: string;
  website: string;
  bio: string;
}

export interface CommentRequest {
  content: string;
  imageId: number;
}

export interface CommentResponse {
  code: number;
  message: string;
  data: null;
}

export function authHeader() {
  const user = sessionStorage.getItem("access_token");
  if (user) {
    return { Authorization: "Bearer " + user };
  }
  return {};
}

export function uploadHeader() {
  const user = sessionStorage.getItem("access_token");
  console.log("세션 토큰 ", user);
  if (user) {
    return {
      Authorization: "Bearer " + user,
      "Content-Type": "multipart/form-data",
    };
  }
  return {};
}
