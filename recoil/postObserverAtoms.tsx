import { atom } from 'recoil';

export const observerState = atom<boolean>({
  key: 'observerState',
  default: false,
});
