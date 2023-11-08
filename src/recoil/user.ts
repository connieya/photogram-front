import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userInfoState = atom({
  key: "userState",
  default: {
    id: "",
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});
