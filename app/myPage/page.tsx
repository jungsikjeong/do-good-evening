'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import Link from 'next/link';

const MyPage = () => {
  const userInfo = useRecoilValue(user);

  const array = Array.from({ length: 10 }, (_, index) => index);
  return (
    <section className='w-full h-screen bg-[#27445c]'>
      <div
        className='relative w-full max-w-7xl h-full m-auto p-4
      flex flex-col items-center justify-center pt-24
      max-sm:pt-44
      '
      >
        <h1 className='w-full text-white mb-4 text-left '>
          민지님의 저녁 기록들..
        </h1>
        <ul
          className='w-full h-[528px] overflow-y-auto scrollable-list
          grid grid-cols-5 gap-4
          max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
          '
        >
          {array.map((data) => (
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

                    <p>부천</p>
                  </div>
                </Link>
              </li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MyPage;
