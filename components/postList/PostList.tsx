'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiShareAlt } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { motion } from 'framer-motion';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PostProps, likeType } from '@/app/mypage/page';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebaseApp';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import { kakaoClipboard } from 'react-kakao-share';

const PostList = ({ moveSectionDown }: any) => {
  const [dummyData, setDummyData] = useState([
    {
      id: '0',
      imgUrl: '/images/example0.jpg',
      description: '오늘 하루도 평안히 마무리',
      nickname: '정두굿',
      uploadTime: '7:31:48 PM',
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '1',
      imgUrl: '/images/example1.jpg',
      description: '저녁 노을 보세요~',
      nickname: '정두쏘굿',
      uploadTime: '6:31:48 PM',
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '2',
      imgUrl: '/images/example2.jpg',
      description: '오.전(오늘 전나이쁘다는 뜻)',
      nickname: '정말요',
      uploadTime: '8:30:48 PM',
      city: 'Bucheon',
      country: 'Korean',
    },
  ]);
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

  const onPostingInfoClick = () => {};

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

  const onPostingShareClick = (data: any) => {
    const image = data?.imageUrl
      ? data?.imageUrl
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbnK2OT%2Fbtsv8UuRUdf%2F2GMlvba3o7hnuSfjIOyZKk%2Fimg.jpg';

    const clipData = {
      title: '오늘 하루도 평안히..',
      description: data?.content,
      image: image,
      APIKEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
    };
    console.log(clipData);
    console.log(image);
    kakaoClipboard(clipData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='relative w-screen h-screen bg-black z-50'>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Keyboard]}
        className='mySwiper'
      >
        {posts && posts?.length > 0 ? (
          <>
            {posts?.map((data, index) => (
              <div key={data.id}>
                <SwiperSlide>
                  <div className='swiper-wrapper'>
                    {/* 포스팅 사진 */}
                    <Image
                      src={data.imgUrl ? data.imgUrl : '/images/example1.jpg'}
                      alt='이미지'
                      fill
                      objectFit='cover'
                    />

                    {/* 포스팅 버튼 그룹 */}
                    <div
                      className='fixed top-40 right-11 h-40 text-4xl text-white flex flex-col justify-between z-50
                max-md:right-3 max-md:text-3xl max-md:justify-around max-md:top-32'
                    >
                      {/* 포스팅 정보 버튼*/}
                      <button onClick={() => onPostingInfoClick()}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          <AiOutlineInfoCircle />
                        </motion.div>
                      </button>

                      {/* 좋아요 버튼*/}
                      <button
                        onClick={() => onPostingLikeClick(data?.id as string)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          {data?.like?.length === 0 ? (
                            <FcLike className='svg_color' />
                          ) : (
                            <>
                              {data?.like?.map((like) =>
                                like.likeUser === userInfo?.uid ? (
                                  <FcLikePlaceholder
                                    className='svg_color-red'
                                    key={`unLike-${like}`}
                                  />
                                ) : (
                                  <FcLike
                                    className='svg_color'
                                    key={`like-${like}`}
                                  />
                                )
                              )}
                            </>
                          )}
                        </motion.div>
                      </button>

                      {/* 공유하기 버튼*/}
                      <button onClick={() => onPostingShareClick(data)}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          <BiShareAlt />
                        </motion.div>
                      </button>
                    </div>

                    {/* 포스팅 내용 */}
                    <div
                      className='absolute bottom-10 left-10 flex flex-col justify-between  h-44
                text-white text-left max-md:h-32 max-md:left-0 max-md:bottom-0 max-md:w-full max-md:pl-4 max-md:py-3 max-md:bg-rgba-opacity'
                    >
                      <p className=''>{data.nickname}님의 저녁</p>

                      <hr className='w-20 h-1 bg-white' />

                      <p>{data.createdAt.slice(12)} EST</p>

                      <p>{data.country}</p>

                      <p>{data.content}</p>
                    </div>
                  </div>

                  {/* 스크롤 버튼 */}
                  <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all z-20 max-md:hidden'>
                    <button onClick={() => moveSectionDown()}>
                      <img
                        src='/images/scroll_icon.png'
                        alt='Scroll'
                        width={50}
                        height={50}
                      />
                    </button>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </>
        ) : (
          <>
            {dummyData?.map((dummy, index) => (
              <>
                <SwiperSlide>
                  <div className='swiper-wrapper' key={`dummy+${index}`}>
                    {/* 포스팅 사진 */}
                    <Image
                      src={dummy.imgUrl}
                      alt='이미지'
                      fill
                      objectFit='cover'
                    />

                    {/* 포스팅 버튼 그룹 */}
                    <div
                      className='fixed top-40 right-11 h-40 text-4xl text-white flex flex-col justify-between z-50
        max-md:right-3 max-md:text-3xl max-md:justify-around max-md:top-32'
                    >
                      {/* 포스팅 정보 버튼*/}
                      <button onClick={() => onPostingInfoClick()}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          <AiOutlineInfoCircle />
                        </motion.div>
                      </button>

                      {/* 좋아요 버튼*/}
                      <button
                        onClick={() =>
                          toast?.info(
                            '더미데이터입니다. 게시글을 새롭게 올려주세요'
                          )
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          <FcLike className='svg_color' />
                        </motion.div>
                      </button>

                      {/* 공유하기 버튼*/}
                      <button
                        onClick={() =>
                          toast?.info(
                            '더미데이터입니다. 게시글을 새롭게 올려주세요'
                          )
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{
                            scale: 0.97,
                            opacity: 0.6,
                          }}
                        >
                          <BiShareAlt />
                        </motion.div>
                      </button>
                    </div>

                    {/* 포스팅 내용 */}
                    <div
                      className='absolute bottom-10 left-10 flex flex-col justify-between  h-44
        text-white text-left max-md:h-32 max-md:left-0 max-md:bottom-0 max-md:w-full max-md:pl-4 max-md:py-3 max-md:bg-rgba-opacity'
                    >
                      <p className=''>{dummy.nickname}님의 저녁</p>

                      <hr className='w-20 h-1 bg-white' />

                      <p>{dummy.uploadTime} EST</p>

                      <p>{dummy.country}</p>

                      <p>{dummy.description}</p>
                    </div>
                  </div>

                  {/* 스크롤 버튼 */}
                  <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all z-20 max-md:hidden'>
                    <button onClick={() => moveSectionDown()}>
                      <img
                        src='/images/scroll_icon.png'
                        alt='Scroll'
                        width={50}
                        height={50}
                      />
                    </button>
                  </div>
                </SwiperSlide>
              </>
            ))}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default PostList;
