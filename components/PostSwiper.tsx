import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';
import dummy from '@/utils/dummydata';
import example0 from '../public/images/example0.jpg';
import example1 from '../public/images/example1.jpg';
import example2 from '../public/images/example2.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PostSwiper = ({ moveSectionDown }: any) => {
  const dataList = [example0, example1, example2];
  return (
    <div className='w-full h-screen'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
      >
        {dummy.map((data, index) => (
          <>
            <SwiperSlide>
              <div key={index}>
                <Image src={dataList[index]} alt='이미지' fill />

                <div
                  className='absolute bottom-10 left-10 flex flex-col justify-between h-44
                text-white text-left'
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
              <div className='absolute bottom-0 m-auto w-full hover:scale-110 transition-all'>
                <button onClick={() => moveSectionDown()}>
                  <Image
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
      </Swiper>
    </div>
  );
};

export default PostSwiper;
