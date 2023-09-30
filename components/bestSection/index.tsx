'use client';

import { useEffect, useState } from 'react';
import MainPosting from './MainPosting';
import SubPosting from './SubPosting';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import { collection, onSnapshot } from 'firebase/firestore';
import { PostProps } from '@/app/mypage/page';
import { db } from '@/firebaseApp';

const BestSection = ({ moveSectionDown }: any) => {
  const [dummyData, setDummyData] = useState([
    {
      id: '0',
      imgUrl: '/images/example0.jpg',
      description: '오늘 하루도 평안히 마무리',
      nickname: '정두굿',
      uploadTime: '7:31:48 PM',
      like: ['uid:', '213213', 'uid:', '213213'],
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '1',
      imgUrl: '/images/example1.jpg',
      description: '저녁 노을 보세요~',
      nickname: '정두쏘굿',
      uploadTime: '6:31:48 PM',
      like: ['uid:', '213213'],
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '2',
      imgUrl: '/images/example2.jpg',
      description: '오.전(오늘 전나이쁘다는 뜻)',
      nickname: '정말요',
      uploadTime: '8:30:48 PM',
      like: [],
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '3',
      imgUrl: '/images/example2.jpg',
      description: '오.전(오늘 전나이쁘다는 뜻)',
      nickname: '정말요',
      uploadTime: '8:30:48 PM',
      like: [],
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '4',
      imgUrl: '/images/example2.jpg',
      description: '오.전(오늘 전나이쁘다는 뜻)',
      nickname: '정말요',
      uploadTime: '8:30:48 PM',
      like: [],
      city: 'Bucheon',
      country: 'Korean',
    },
  ]);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const userInfo = useRecoilValue(user);

  // 좋아요 많은 순서로 정렬
  const sortedDummyData = [...dummyData].sort(
    (a, b) => b.like.length - a.like.length
  );

  const getPosts = () => {
    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');

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

  useEffect(() => {
    getPosts();
  }, []);

  if (posts.length === 0 || !posts) {
    return (
      <section className='section flex justify-center items-center w-full h-full bg__posting-section'>
        <div className='max-w-sm  m-auto '>
          <div className='text-white font-bold text-center p-4 leading-6'>
            '베스트 게시글'에 올라온 게시글이 없습니다. 게시글에 좋아요를 눌러
            직접 베스트 게시글을 만들어주세요
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className='section flex justify-center items-center w-full h-full bg__posting-section'>
        <div className='max-w-7xl m-auto '>
          <ul className='grid grid-cols-4 gap-1 '>
            <MainPosting data={posts[0]} />

            {posts?.slice(1, 5).map((data) => (
              <SubPosting key={data.id} data={data} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
};

export default BestSection;
