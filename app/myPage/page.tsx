'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import Loading from '@/components/Loading';

interface PostProps {
  content: string;
  country: string;
  createdAt: string;
  email: string;
  imgUrl: string;
  id: string;
  uid: string;
}

const MyPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const userInfo = useRecoilValue(user);

  const getPosts = async () => {
    setLoading(true);

    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');
    let postQuery;

    postQuery = query(postRef, orderBy('createdAt', 'asc'));

    const datas = await getDocs(postQuery);

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });

    setLoading(false);
  };

  useEffect(() => {
    if (!userInfo) {
      toast.warn('로그인을 해주세요', { position: 'top-center' });
      redirect('/');
    }
  }, [userInfo]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className='w-full h-screen bg-[#27445c]'>
      <div
        className='relative w-full max-w-7xl h-full m-auto p-4
      flex flex-col items-center justify-center pt-24
      max-sm:pt-44
      '
      >
        <h1 className='w-full text-white mb-4 text-left '>
          {userInfo?.nickname}님의 저녁 기록들..
        </h1>
        <ul
          className='w-full h-[528px] overflow-y-auto scrollable-list
          grid grid-cols-5 gap-4
          max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
          '
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {posts.length > 0 &&
                posts?.map((post) => (
                  <>
                    <li className='relative h-64 overflow-hidden cursor-pointer max-sm:h-48 '>
                      <Link href='/detail'>
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
                ))}
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

export default MyPage;
