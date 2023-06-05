import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: 'loginState',
  default: {
    id: -1,
    name: '',
    isLoggedin: false
  },
  effects_UNSTABLE: [persistAtom],
});
