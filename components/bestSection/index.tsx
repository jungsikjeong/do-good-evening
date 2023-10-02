'use client';

import { useEffect, useState } from 'react';
import MainPosting from './MainPosting';
import SubPosting from './SubPosting';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '@/recoil/userAtoms';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { PostProps } from '@/app/mypage/page';
import { db } from '@/firebaseApp';
import Image from 'next/image';
import {
  isPostDetailModal,
  postDetailInfo,
} from '@/recoil/postDetailModalAtoms';
import PostDetailModal from '../PostDetailModal';

const BestSection = ({ moveSectionDown }: any) => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const userInfo = useRecoilValue(user);
  const postModalState = useRecoilValue(isPostDetailModal);
  const setPostModalState = useSetRecoilState(isPostDetailModal);
  const setPostInfo = useSetRecoilState(postDetailInfo);

  const getPosts = () => {
    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');

    const testRef = collection(db, 'users');
    const q = query(testRef, orderBy('createdAt', 'asc'));
    console.log(q);
    // const datas = await getDocs(postQuery);
    onSnapshot(postRef, (querySnapshot) => {
      let dataArr = [] as PostProps[];
      querySnapshot.forEach((doc) => {
        const dataObj = { ...doc.data(), id: doc.id } as PostProps;
        dataArr.push(dataObj);
      });

      // 좋아요 수를 기준으로 정렬
      const sortData: any = dataArr
        .sort((a, b) => b.like.length - a.like.length)
        .slice(0, 5);

      setPosts(sortData);
    });
  };

  const onPostClick = (data: PostProps) => {
    setPostModalState((prev) => !prev);
    setPostInfo(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (posts.length === 0 || !posts) {
    return (
      <section className='section flex justify-center items-center w-full h-full bg__posting-section'>
        <div className='max-w-sm  m-auto '>
          <div className='text-white font-bold text-center p-4 leading-6'>
            <p>
              <span className='text-lg'>'베스트 게시글'</span>에 올라온 게시글이
              없습니다.
            </p>
            <p>게시글에 좋아요를 눌러서 새로운</p>
            <p>베스트 게시글을 만들어주세요</p>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className='section flex justify-center items-center w-full h-full bg__posting-section'
        onClick={() => postModalState && setPostModalState(false)}
      >
        <div className='max-w-7xl  m-auto'>
          {postModalState && <PostDetailModal />}

          <ul className='grid grid-cols-4 gap-1 '>
            <MainPosting
              data={posts[0]}
              styles={posts.length === 1 ? true : false}
              onClick={onPostClick}
            />

            {posts?.slice(1, 5).map((data) => (
              <SubPosting key={data.id} data={data} onClick={onPostClick} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
};

export default BestSection;
