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

export const isPostInfoModal = atom<boolean>({
  key: 'isPostInfoModalState',
  default: false,
});

export const postInfo = atom<PostProps | null>({
  key: 'postInfoState',
  default: null,
});
