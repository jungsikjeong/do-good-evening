'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiShareAlt } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const PostSwiper = ({ moveSectionDown }: any) => {
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

  const onClick = () => {
    console.log('클릭');
  };
  return (
    <div className='relative w-screen h-screen bg-black z-50'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
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
        {dummyData.map((data, index) => (
          <SwiperSlide key={data.id}>
            <div className=''>
              {/* 포스팅 사진 */}
              {/* <Image src={data.imgUrl} alt='이미지' fill objectFit='cover' /> */}
              <img
                src={data.imgUrl}
                alt='이미지'
                className='absolute top-0 left-0'
              />

              {/* 포스팅 버튼 그룹 */}
              <div
                className='fixed top-40 right-11 h-40 text-4xl text-white flex flex-col justify-between z-50
                max-md:right-3 max-md:text-3xl max-md:justify-around max-md:top-32'
              >
                {/* 포스팅 정보 */}
                <button onClick={onClick}>
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

                {/* 좋아요 */}
                <button onClick={onClick}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{
                      scale: 0.97,
                      opacity: 0.6,
                    }}
                  >
                    <FcLikePlaceholder className='svg_color' />
                  </motion.div>
                </button>

                {/* 공유하기 */}
                <button>
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

                <p>{data.uploadTime} EST</p>

                <p>
                  {data.city}, {data.country}
                </p>

                <p>{data.description}</p>
              </div>
            </div>

            {/* 스크롤 버튼 */}
            <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all max-md:hidden'>
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
        ))}
      </Swiper>
    </div>
  );
};

export default PostSwiper;
