import { atom } from 'recoil';

interface PostProps {
  content: string;
  country: string;
  createdAt: string;
  email: string;
  imgUrl: string;
  id?: string;
  uid: string;
  nickname: string;
  like: likeType[];
}

type likeType = {
  likeUser: string;
};

export const isPostDetailModal = atom<boolean>({
  key: 'isPostDetailModalState',
  default: false,
});

export const postDetailInfo = atom<PostProps | null>({
  key: 'postDetailInfoState',
  default: null,
});
