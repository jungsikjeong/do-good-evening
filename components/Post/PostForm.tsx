'use client';

import { countriesType } from '@/utils/countryNames';
import Image from 'next/image';

import { AiOutlineCloudUpload } from 'react-icons/ai';

interface PostFormProps {
  sortByCountryName: countriesType[];
  countries: string;
}

const PostForm = ({ sortByCountryName, countries }: PostFormProps) => {
  return (
    <>
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
                backgroundImage: 'linear-gradient(to right, #FFD700, #FFA500)',
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
    </>
  );
};

export default PostForm;
