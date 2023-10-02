'use client';

import { GiSunset } from 'react-icons/gi';
import { BiLike } from 'react-icons/bi';
import { ImPencil2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebaseApp';

interface manyPostsProps {
  country: string;
  likeCount?: number;
  post?: number;
}

interface topUsersProps {
  id: string;
  combinedCount: number;
  nickname: string;
}

const Rank = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [topUsers, setTopUsers] = useState<topUsersProps[]>([]);
  const [manyPosts, setManyPosts] = useState<manyPostsProps[]>([]);
  const [manyLikedPosts, setManyLikedPosts] = useState<manyPostsProps[]>([]);
  const ranking = Array.from(Array(7), (_, index) => index + 1);

  const getTopUsers = async () => {
    // users 초기화
    setTopUsers([]);

    let userRef = collection(db, 'users');

    // const userSnapshot = await getDocs(userQuery);

    const userSnapshot = await getDocs(userRef);
    let sortedUsers: topUsersProps[] = [];

    userSnapshot.forEach((doc) => {
      let userData = doc.data();
      let combinedCount = userData.likeCount + userData.postCount;
      sortedUsers.push({
        id: doc.id,
        combinedCount: combinedCount,
        nickname: userData.nickname,
      });
    });

    sortedUsers.sort((a: any, b: any) => b.combinedCount - a.combinedCount);

    // 상위 10개만 가져오기
    let top10Users = sortedUsers.slice(0, 10);

    setTopUsers(top10Users);
  };

  const getManyPosts = async () => {
    // manyPosts 초기화
    setManyPosts([]);

    let postRef = collection(db, 'posts');
    let postQuery;

    postQuery = query(postRef, orderBy('createdAt', 'asc'));

    const datas = await getDocs(postQuery);

    // 국가별 게시글 수를 저장하는 배열
    let countriesData: any = [];

    datas.forEach((doc) => {
      const country = doc.data() as any;

      // 기존 배열에서 나라의 인덱스 찾기
      const index = countriesData.findIndex(
        (item: any) => item.country === country.country
      );

      if (index !== -1) {
        // 이미 존재하는 나라일 경우 나라 카운트 증가
        countriesData[index].post++;
      } else {
        // 새로운 나라일 경우 배열에 추가
        countriesData.push({
          country: country.country,
          post: 1,
        });
      }
    });
    const sortData = countriesData.sort((a: any, b: any) => b.post - a.post);
    setManyPosts(sortData);
    setLoading(false);
  };

  const getManyLikedPosts = async () => {
    //  초기화
    setManyLikedPosts([]);

    let postRef = collection(db, 'posts');
    let postQuery;

    postQuery = query(postRef, orderBy('createdAt', 'asc'));

    const datas = await getDocs(postQuery);

    // 국가별 좋아요 수를 저장하는 배열
    let countriesData: any = [];

    datas.forEach((doc) => {
      const country = doc.data() as any;

      // 기존 배열에서 나라의 인덱스 찾기
      const index = countriesData.findIndex(
        (item: any) => item.country === country.country
      );

      if (index !== -1) {
        // 이미 존재하는 나라일 경우 좋아요 카운트 증가
        countriesData[index].likeCount += country.like.length;
      } else {
        // 새로운 나라일 경우 배열에 추가
        countriesData.push({
          country: country.country,
          likeCount: country.like.length,
        });
      }
    });
    const sortData = countriesData.sort(
      (a: any, b: any) => b.likeCount - a.likeCount
    );
    setManyLikedPosts(sortData);
    setLoading(false);
  };

  useEffect(() => {
    getTopUsers();
    getManyPosts();
    getManyLikedPosts();
  }, []);

  return (
    <section className='section w-full h-full bg-[#353535]'>
      <ul className='max-w-5xl flex m-auto gap-10 text-gray-200 max-md:flex-wrap max-md:h-[350px] p-4'>
        <li className='w-full flex flex-col gap-1 h-96 overflow-y-auto scrollable-list p-2'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 저녁을 나눈 두굿이들</h3>
            <GiSunset />
          </div>

          {/* 가장 베스트 유저 1~3위*/}
          <div className='flex justify-around py-4 border-b-2 border-gray-400'>
            {topUsers.slice(0, 3).map((data, index) => (
              <>
                <div className='flex gap-1 flex-col items-center '>
                  {index === 0 ? (
                    <img className='w-6 h-6' src='/images/gold.png' alt='' />
                  ) : null}
                  {index === 1 ? (
                    <img className='w-6 h-6' src='/images/silver.png' alt='' />
                  ) : null}
                  {index === 2 ? (
                    <img className='w-6 h-6' src='/images/bronze.png' alt='' />
                  ) : null}

                  <p> {data.nickname} </p>
                  <div className='flex justify-center items-center gap-1 text-sm px-2'>
                    <ImPencil2 />
                    <BiLike />
                    <p className='pl-3'>{data.combinedCount}</p>
                  </div>
                </div>
              </>
            ))}
          </div>

          {/* 가장 많이 주목을 받은 유저 4~10위 */}
          {topUsers?.slice(3)?.map((data, index) => (
            <div
              className='flex item-center p-2 border-b-[1px] border-gray-400 last:border-0'
              key={index}
            >
              <p className='mr-auto'>
                <span className='pr-2'>{index + 4}</span>
                {data?.nickname}
              </p>
              <div className='flex items-center gap-1'>
                <ImPencil2 />
                <BiLike />
                <p className='pl-2'>{data?.combinedCount}</p>
              </div>
            </div>
          ))}
        </li>

        {/* 게시글을 많이 작성한 나라들 */}
        <li className='w-full flex flex-col gap-1 h-96 overflow-y-auto scrollable-list p-2'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 저녁을 나눈 나라들</h3>
            <GiSunset />
          </div>

          {manyPosts.map((data, index) => (
            <>
              <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
                <div className='flex mr-auto gap-2'>
                  {index <= 2 ? (
                    <>
                      {index === 0 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/gold.png'
                          alt=''
                        />
                      ) : null}
                      {index === 1 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/silver.png'
                          alt=''
                        />
                      ) : null}
                      {index === 2 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/bronze.png'
                          alt=''
                        />
                      ) : null}
                    </>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  &nbsp;{data.country}
                </div>

                <div className='flex items-center gap-1'>
                  <ImPencil2 />
                  <p className='pl-2'>{data.post}</p>
                </div>
              </div>
            </>
          ))}
        </li>

        <li className='w-full flex flex-col gap-1 h-96 overflow-y-auto scrollable-list p-2'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 주목을 받은 나라들</h3>
            <GiSunset />
          </div>

          {manyLikedPosts.map((data, index) => (
            <>
              <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
                <div className='flex mr-auto gap-2'>
                  {index <= 2 ? (
                    <>
                      {index === 0 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/gold.png'
                          alt=''
                        />
                      ) : null}
                      {index === 1 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/silver.png'
                          alt=''
                        />
                      ) : null}
                      {index === 2 ? (
                        <img
                          className='w-6 h-6'
                          src='/images/bronze.png'
                          alt=''
                        />
                      ) : null}
                    </>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  &nbsp;{data.country}
                </div>

                <div className='flex items-center gap-1'>
                  <ImPencil2 />
                  <p className='pl-2'>{data.likeCount}</p>
                </div>
              </div>
            </>
          ))}
        </li>
      </ul>
    </section>
  );
};

export default Rank;
