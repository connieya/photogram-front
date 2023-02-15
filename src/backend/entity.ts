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
