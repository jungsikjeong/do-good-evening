'use client';

import { app } from '@/firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormClose } from 'react-icons/gr';
import { toast } from 'react-toastify';

interface SignInFormProps {
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

export type Inputs = {
  email: string;
  nickname?: string;
  password: string;
  passwordCheck?: string;
};

const SignInForm = ({ setAuthModal }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const auth = getAuth(app);

      await signInWithEmailAndPassword(auth, data?.email, data?.password);

      toast.success('로그인에 성공했습니다.', {
        position: toast.POSITION.TOP_CENTER,
      });

      setAuthModal(false);
    } catch (error: any) {
      toast.error(error?.code, { position: toast.POSITION.TOP_CENTER });
    }
  };

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

      <form className='w-full h-full mt-14' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 flex items-center'>
          <label
            htmlFor='email'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm '
          >
            <span className='align-middle text-red-500'>*</span> 이메일
          </label>

          <input
            type='email'
            placeholder='이메일 입력'
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식을 입력해주세요',
              },
            })}
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
            placeholder='비밀번호 입력'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              maxLength: {
                value: 6,
                message: '6글자이하로 입력해주세요',
              },
              minLength: {
                value: 6,
                message: '6글자까지 입력해주세요.',
              },
            })}
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>

        {errors && (
          <p className='text-[tomato] text-xs mt-1'>
            {errors.email?.message || errors.password?.message}
          </p>
        )}

        {/* isValid가 false면 버튼클릭 안됨 */}
        <button
          className={`${
            isValid
              ? 'w-40 py-1 mt-6 bg-gray-300 font-bold text-white rounded transition-all'
              : 'w-40 py-1 mt-6 bg-gray-200 text-white rounded transition-all font-normal'
          } `}
          disabled={isValid ? false : true}
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

export default SignInForm;
