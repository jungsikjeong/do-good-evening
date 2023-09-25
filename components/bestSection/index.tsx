'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { FcLikePlaceholder } from 'react-icons/fc';
import { BiShareAlt } from 'react-icons/bi';
import MainPosting from './MainPosting';
import SubPosting from './SubPosting';

const BestSection = ({ moveSectionDown }: any) => {
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
    {
      id: '3',
      imgUrl: '/images/example2.jpg',
      description: '오.전(오늘 전나이쁘다는 뜻)',
      nickname: '정말요',
      uploadTime: '8:30:48 PM',
      city: 'Bucheon',
      country: 'Korean',
    },
    {
      id: '4',
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
    <section className='section flex justify-center items-center w-full h-full bg__posting-section'>
      <div className='max-w-7xl m-auto '>
        <ul className='grid grid-cols-4 gap-1 '>
          <MainPosting onClick={onClick} />

          <SubPosting onClick={onClick} />
          <SubPosting onClick={onClick} />
          <SubPosting onClick={onClick} />
          <SubPosting onClick={onClick} />
        </ul>
      </div>
    </section>
  );
};

export default BestSection;
