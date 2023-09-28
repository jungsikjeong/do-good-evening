'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import Loading from '@/components/Loading';

export interface PostProps {
  content: string;
  country: string;
  createdAt: string;
  email: string;
  imgUrl: string;
  id: string;
  uid: string;
  nickname: string;
  like: likeType[];
}

export type likeType = {
  likeUser: string;
};

const MyPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostProps[]>([]);

  // Text content does not match server-rendered HTML
  // 위의 에러때문에  recoil user state 사용을 못함
  // useEffect에서 useState에 저장하는식으로 하려고했는데 새로고침하면 처음 언디파인이 떠서 이렇게해줬음
  const user = JSON.parse(localStorage.getItem('user') as string);

  const getPosts = async () => {
    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');
    let postQuery;
    const user = JSON.parse(localStorage.getItem('user') as string);

    postQuery = query(
      postRef,
      where('uid', '==', user.userState.uid),
      orderBy('createdAt', 'asc')
    );

    const datas = await getDocs(postQuery);

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });

    setLoading(false);
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('user') as string);
    if (!localState || localState.userState === null) {
      toast.warn('로그인을 해주세요', { position: 'top-center' });
      redirect('/');
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <section className='w-full h-screen bg-[#27445c]'>
        <div
          className='relative w-full max-w-7xl h-full m-auto p-4
      flex flex-col items-center justify-center pt-24
      max-sm:pt-44
      '
        >
          <h1 className='w-full text-white mb-4 text-left '>
            {user && user?.userState?.nickname}님의 저녁 기록들..
          </h1>
          <ul
            className='w-full h-[528px] overflow-y-auto scrollable-list
          grid grid-cols-5 gap-4
          max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
          '
          >
            {posts.length > 0 ? (
              posts?.map((post) => (
                <>
                  <li className='relative h-64 overflow-hidden cursor-pointer max-sm:h-48'>
                    <Link href='/detail' key={post.id}>
                      <Image
                        src='/images/example0.jpg'
                        alt=''
                        fill
                        className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
                      />

                      <div
                        className='absolute bottom-4 px-2 flex flex-col 
                    text-white '
                      >
                        <p>8:30:48 PM EST</p>

                        <p>{post.country}</p>
                      </div>
                    </Link>
                  </li>
                </>
              ))
            ) : (
              <div className='text-white opacity-40 text-center'>기록 없음</div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyPage;
