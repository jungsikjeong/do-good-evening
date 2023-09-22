'use client';

import { SetStateAction } from 'react';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormClose } from 'react-icons/gr';

interface SignUpFormProps {
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ setAuthModal }: SignUpFormProps) => {
  return (
    <div className='w-full h-full p-2'>
      <div className='relative'>
        <h1 className='text-gray-600 font-bold'>회원가입</h1>
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

        <div className=' flex items-center'>
          <label
            htmlFor='nickname'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm '
          >
            <span className='align-middle text-red-500'>*</span> 닉네임
          </label>
          <input
            type='text'
            id='nickname'
            name='nickname'
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>

        <div className='clear-both mb-4'></div>

        <div className='flex items-center mb-4'>
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

        <div className='flex items-center '>
          <label
            htmlFor='passwordCheck'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm'
          >
            <span className='align-middle text-red-500'>*</span> 비밀번호 <br />
            재확인
          </label>
          <input
            type='password'
            id='passwordCheck'
            name='passwordCheck'
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>

        <button
          className='w-40 py-1 mt-6 bg-gray-200 text-white rounded'
          disabled={true}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
