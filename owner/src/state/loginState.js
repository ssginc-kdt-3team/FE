import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: {
    id: -1,
    isLoggedin: false
  },
  effects_UNSTABLE: [persistAtom],
});
