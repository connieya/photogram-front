import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const followFlag = atom({
  key: "followFlag",
  default: "",

  effects_UNSTABLE: [persistAtom],
});
