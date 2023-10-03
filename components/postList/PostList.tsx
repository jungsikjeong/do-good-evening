'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiShareAlt } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { motion } from 'framer-motion';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ShareButton from '../ShareButton';
import LikeButton from '../LikeButton';
import { isPostInfoModal, postInfo } from '@/recoil/postInfoModalAtoms';
import PostInfoModal from '../PostInfoModal';
import { observerState } from '@/recoil/postObserverAtoms';

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
  const observer = useRecoilValue(observerState);
  const setObserver = useSetRecoilState(observerState);

  const postModalState = useRecoilValue(isPostInfoModal);
  const setPostModalState = useSetRecoilState(isPostInfoModal);

  const setPostInfo = useSetRecoilState(postInfo);

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

  const onPostingInfoClick = (data: any) => {
    setPostModalState((prev) => !prev);
    setPostInfo(data);
  };

  useEffect(() => {
    if (observer) {
      getPosts();
      setObserver(false);
    }
    getPosts();
  }, [observer]);

  return (
    <div
      className='relative w-screen h-screen bg-black z-50'
      onClick={() => postModalState && setPostModalState(false)}
    >
      {postModalState && <PostInfoModal />}
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
                      <button onClick={() => onPostingInfoClick(data)}>
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
                      <LikeButton post={data} />

                      {/* 공유하기 버튼*/}
                      <ShareButton post={data} />
                    </div>

                    {/* 포스팅 내용 */}
                    <div
                      className='absolute bottom-10 left-10 flex flex-col justify-between  h-44
                text-white text-left max-md:h-32 max-md:left-0 max-md:bottom-0 max-md:w-full max-md:pl-4 max-md:py-3 max-md:bg-rgba-opacity
                max-md:text-sm'
                    >
                      <p className=''>{data.nickname}님의 저녁</p>

                      <hr className='w-20 h-0 bg-white' />

                      <p>{data.createdAt.slice(12)} EST</p>

                      <p>{data.country}</p>

                      <p>
                        {data.content.length > 15
                          ? data.content.slice(0, 15) + '...'
                          : data.content}
                      </p>
                    </div>
                  </div>

                  {/* 스크롤 버튼 */}
                  <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all z-20 '>
                    {/* <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all z-20 max-md:hidden'> */}
                    <button
                      onClick={() => moveSectionDown()}
                      className='max-md:w-11 max-md:mb-6'
                    >
                      <img src='/images/scroll_icon.png' alt='Scroll' />
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
                      className='absolute bottom-10 left-10 flex flex-col justify-between h-44
        text-white text-left max-md:h-32 max-md:left-0 max-md:bottom-0 max-md:w-full max-md:pl-4 max-md:py-3 max-md:bg-rgba-opacity
        '
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
