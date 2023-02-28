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

export interface SignInResponse {
  code: number;
  message: string;
  data: TokenDto;
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

export class UserInfo {
  id: number = 0;
  usermame: string = "cony";
  nickname: string = "코니";
  website: string = "a";
  bio: string = "a";
  profileImageUrl: string = "a";
}

export interface UserProfile {
  pageOwner: boolean;
  imageCount: number;
  subscribeState: boolean;
  subscribeCount: number;
  subscribedCount: number;
  user: UserInfo;
}

export interface UserProfileResponse {
  code: number;
  message: string;
  data: UserProfile;
}

export function authHeader() {
  const user = sessionStorage.getItem("access_token");
  console.log("세션 토큰 ", user);
  if (user) {
    return { Authorization: "Bearer " + user };
  }
  return {};
}
