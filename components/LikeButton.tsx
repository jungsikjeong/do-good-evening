'use client';

import { PostProps, likeType } from '@/app/mypage/page';
import { db } from '@/firebaseApp';
import { user } from '@/recoil/userAtoms';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

interface LikeButtonProps {
  post: PostProps;
}

const LikeButton = ({ post }: LikeButtonProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const userInfo = useRecoilValue(user);

  const getPosts = () => {
    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');

    onSnapshot(postRef, (querySnapshot) => {
      let dataArr = [] as any;
      querySnapshot.forEach((doc) => {
        const dataObj = { ...doc.data(), id: doc.id };
        dataArr.push(dataObj);
      });
      setPosts(dataArr);
    });
  };

  const onPostingLikeClick = async (postId: string) => {
    if (!userInfo) {
      toast?.error('로그인이 필요한 서비스입니다. 로그인해주세요!', {
        position: 'top-center',
      });
      return; // 로그인되지 않았을 경우 함수 종료
    }

    const postRef = doc(db, 'posts', postId);
    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists()) {
      console.error('해당 포스트가 존재하지 않습니다.');
      return;
    }

    // 기존 좋아요 목록을 가져옴
    const post = postSnapshot.data();
    const likes = (post?.like as likeType[]) || [];

    // 좋아요를 이미 누른 경우 중복으로 추가하지 않도록 체크
    const userLikeIndex = likes.findIndex(
      (like) => like.likeUser === userInfo.uid
    );

    if (userLikeIndex !== -1) {
      likes.splice(userLikeIndex, 1); // 해당 사용자의 좋아요 정보 제거
      // 업데이트된 데이터를 저장
      await updateDoc(postRef, {
        like: likes,
      });
      getPosts();
      toast?.success('좋아요를 취소했습니다.', { position: 'top-center' });
    } else {
      // 좋아요를 누르지 않은 경우 새로운 좋아요 정보 추가
      likes.push({ likeUser: userInfo.uid });
      // 업데이트된 데이터를 저장
      await updateDoc(postRef, {
        like: likes,
      });
      getPosts();
      toast?.success('좋아요를 눌렀습니다.', { position: 'top-center' });
    }
  };

  return (
    <button onClick={() => onPostingLikeClick(post?.id as string)}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{
          scale: 0.97,
          opacity: 0.6,
        }}
      >
        {post?.like?.length === 0 ? (
          <FcLike className='svg_color' />
        ) : (
          <>
            {post?.like?.map((like) =>
              like.likeUser === userInfo?.uid ? (
                <FcLikePlaceholder
                  className='svg_color-red'
                  key={`unLike-${like}`}
                />
              ) : (
                <FcLike className='svg_color' key={`like-${like}`} />
              )
            )}
          </>
        )}
      </motion.div>
    </button>
  );
};

export default LikeButton;
