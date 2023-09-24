'use client';

import Image from 'next/image';
import { SetStateAction, useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { COUNTRIES } from '@/utils/countryNames';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';

interface PostModalProps {
  postModal: boolean;
  setPostModal: React.Dispatch<SetStateAction<boolean>>;
}

const PostModal = ({ postModal, setPostModal }: PostModalProps) => {
  // 한글 나라이름 순서대로 정렬
  const [sortByCountryName, setSortByCountryName] = useState(
    [...COUNTRIES].sort((a, b) => {
      return a.koreanName.localeCompare(b.koreanName);
    })
  );

  const [countries, setCountries] = useState('대한민국');

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center authBgColor'>
      <div
        className='relative grid grid-cols-2 gap-4 justify-center p-4 max-w-[50rem] max-h-[620px] bg-gray-200 border rounded
      max-md:h-auto max-md:grid-cols-1  overflow-y-auto
      '
      >
        {/* 닫기 버튼 */}
        <button
          className='absolute top-3 right-9 text-3xl max-md:top-2 max-md:right-3 closeButton'
          onClick={() => setPostModal(false)}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.97,
              opacity: 0.6,
            }}
          >
            <GrFormClose />
          </motion.div>
        </button>

        <div className='flex flex-col items-center'>
          <div className='relative w-96 h-72 max-md:w-80 max-md:mt-6'>
            <Image
              src='/images/example1.jpg'
              alt='기본이미지'
              fill
              className='border rounded'
            />
          </div>

          <button className='flex justify-center items-center bg-gray-400 w-32 h-8 mt-3 rounded hover:bg-gray-500 transition-none'>
            <label htmlFor='input-file'>
              <AiOutlineCloudUpload className='svg__upload' />
              <input
                type='file'
                name='input-file'
                id='input-file'
                accept='image/*'
                // multiple
                style={{ display: 'none' }}
                // onChange={(e) => onFileUpload(e, index)}
              />
            </label>
          </button>
        </div>

        <div
          className='flex flex-col items-center w-96 m-auto
         max-w-xs'
        >
          <h1 className='text-black font-bold text-center max-md:absolute max-md:top-2'>
            당신의 저녁을 공유해주세요.
          </h1>

          <div className='mt-8 max-md:mt-2'>
            {/* 나라 선택 */}
            <div className='flex items-center mb-4'>
              <label htmlFor='category' className='w-1/2 font-semibold text-sm'>
                당신은 어디에 있나요?
              </label>
              <select
                name='category'
                id='category'
                defaultValue={countries}
                //   onChange={handleChange}
                className='w-1/2  p-1 rounded scrollable-list'
              >
                <option value='' className='bg-gray-100 '>
                  나라를 선택해주세요
                </option>

                {sortByCountryName?.map((country) => (
                  <option
                    value={country?.koreanName}
                    key={country?.koreanName}
                    className='bg-gray-100'
                  >
                    {country?.koreanName}
                  </option>
                ))}
              </select>
            </div>

            {/* 내용 입력 칸 */}
            <form className='flex flex-col '>
              <textarea
                className='rounded h-[10.5rem] p-2'
                placeholder='당신의 저녁을 공유해주세요.'
              />

              <button
                className='m-auto flex justify-center items-center 
               w-32 h-8 mt-3 transition-all hover:shadow-md'
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #FFD700, #FFA500)',
                  borderImage: 'linear-gradient(to right, #FFD700, #FFA500)',
                  borderImageSlice: '1',
                  borderRadius: '5px',
                }}
              >
                저녁 공유
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
