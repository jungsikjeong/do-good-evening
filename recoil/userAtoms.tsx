import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface UserProps {
  email: string;
  nickname: string;
  uid: string;
}

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const user = atom<UserProps | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
