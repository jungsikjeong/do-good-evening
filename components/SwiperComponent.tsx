'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperComponent = () => {
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
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS74CrRh-ik_75jQumDw2gAqSOKfV2hFibcPX8JP4aCbLGRSxRr1YQ1cMV46Yj9IVsO4Fc&usqp=CAU'
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
