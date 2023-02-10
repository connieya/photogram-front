import { produceCreateAPI } from "./apiUtils";
import { SignInRequest } from "./entity";

export const SignInUser = produceCreateAPI<SignInRequest, {}>("auth/signin");
