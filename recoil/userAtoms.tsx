import { atom } from 'recoil';

interface UserProps {
  email: string;
  nickname: string;
  uid: string;
}

const storedUser = localStorage.getItem('user');

let defaultUser: UserProps | null = null;

if (storedUser) {
  defaultUser = JSON.parse(storedUser) as UserProps;
}

export const user = atom<UserProps | null>({
  key: 'userState',
  default: defaultUser,
});
