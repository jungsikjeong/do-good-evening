import { PostProps } from '@/app/mypage/page';
import { atom } from 'recoil';

export const isPostDetailModal = atom<boolean>({
  key: 'isPostDetailModalState',
  default: false,
});

export const postDetailInfo = atom<PostProps | null>({
  key: 'postDetailInfoState',
  default: null,
});
