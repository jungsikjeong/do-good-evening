import { PostProps } from '@/app/mypage/page';
import { atom } from 'recoil';

export const isPostInfoModal = atom<boolean>({
  key: 'isPostInfoModalState',
  default: false,
});

export const postInfo = atom<PostProps | null>({
  key: 'postInfoState',
  default: null,
});
