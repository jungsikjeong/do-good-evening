import { atom } from 'recoil';

interface UserProps {
  email: string;
  nickname: string;
  uid: string;
}

export const user = atom<UserProps | null>({
  key: 'userState',
  default: null,
});
