import { produceCreateAPI } from "./apiUtils";
import { SignInRequest, SignUpRequest, SignUpResponse } from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, {}>("auth/signin");

export const SignUpUser = produceCreateAPI<SignUpRequest, SignUpResponse>(
  "auth/signup"
);
