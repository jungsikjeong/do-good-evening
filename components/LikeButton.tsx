'use client';

import { db } from '@/firebaseApp';
import { user } from '@/recoil/userAtoms';
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { FcLikePlaceholder } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

// ... (이전 코드)

const LikeButton = ({ post }: any) => {
  const userInfo = useRecoilValue(user);

  const [isLiked, setIsLiked] = useState(
    post?.like?.some((like: any) => like.likeUser === userInfo?.uid)
  );

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
    const likes = (post?.like as any[]) || [];

    // 좋아요 상태를 토글
    const userLikeIndex = likes.findIndex(
      (like) => like.likeUser === userInfo.uid
    );

    if (userLikeIndex !== -1) {
      likes.splice(userLikeIndex, 1); // 해당 사용자의 좋아요 정보 제거
      // 업데이트된 데이터를 저장
      await updateDoc(postRef, {
        like: likes,
      });
      setIsLiked(false);
      toast?.success('좋아요를 취소했습니다.', { position: 'top-center' });
    } else {
      // 좋아요를 누르지 않은 경우 새로운 좋아요 정보 추가
      likes.push({ likeUser: userInfo.uid });
      // 업데이트된 데이터를 저장
      await updateDoc(postRef, {
        like: likes,
      });
      setIsLiked(true);
      // 유저 도큐먼트에서 likeCount 1증가
      const userRef = doc(db, 'users', userInfo?.uid);
      await updateDoc(userRef, {
        likeCount: increment(1),
      });
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
        {isLiked ? (
          <FcLikePlaceholder className='svg_color-red' />
        ) : (
          <FcLike className='svg_color' />
        )}
      </motion.div>
    </button>
  );
};

export default LikeButton;
