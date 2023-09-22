'use client';

import { SetStateAction } from 'react';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormClose } from 'react-icons/gr';

interface LoginFromProps {
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const LoginForm = ({ setAuthModal }: LoginFromProps) => {
  return (
    <div className='w-full h-full p-2'>
      <div className='relative '>
        <h1 className='text-gray-600 font-bold'>로그인</h1>
        <button
          className='absolute top-0 right-6 text-3xl closeButton'
          onClick={() => setAuthModal(false)}
        >
          <GrFormClose />
        </button>
      </div>

      <form className='w-full h-full mt-14'>
        <div className='mb-4 flex items-center'>
          <label
            htmlFor='email'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm '
          >
            <span className='align-middle text-red-500'>*</span> 이메일
          </label>
          <input
            type='text'
            id='email'
            name='email'
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>

        <div className='clear-both mb-4'></div>

        <div className='flex items-center '>
          <label
            htmlFor='password'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm'
          >
            <span className='align-middle text-red-500'>*</span> 비밀번호
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>

        <button
          className='w-40 py-1 mt-6 bg-gray-200 text-white rounded'
          disabled={true}
        >
          로그인
        </button>

        <p className='flex justify-center items-center mt-20 text-base transition-all'>
          <span className='flex justify-center items-center hover:border-b-2'>
            회원가입 시 옆으로 슬라이드
            <GrFormNextLink />
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
