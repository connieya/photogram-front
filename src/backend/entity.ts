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

export interface User {
  usermame: string;
  bio: string;
  profileImageUrl: string;
}

export interface UserProfile {
  pageOwner: boolean;
  imageCount: number;
  subscribeState: boolean;
  subscribeCount: number;
  subscribedCount: number;
  user: User;
}
