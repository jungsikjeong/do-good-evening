'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormClose } from 'react-icons/gr';
import { Inputs } from './SignInForm';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { app, db } from '@/firebaseApp';
import { useSetRecoilState } from 'recoil';
import { user } from '@/recoil/userAtoms';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

interface SignUpFormProps {
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ setAuthModal }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const setUser = useSetRecoilState(user);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const auth = getAuth(app);

      if (data && data.email && data.nickname && data.password) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: data.nickname,
        });

        const userData = {
          email: user.email,
          nickname: user.displayName,
          uid: user.uid,
        };

        await setDoc(doc(db, 'users', user.uid), {
          nickname: user.displayName,
          likeCount: 0,
          postCount: 0,
          uid: user.uid,
        });

        toast.success('회원가입에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });

        setUser(userData as any);

        setAuthModal(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
  };

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

      <form
        className='w-full h-full mt-14'
        onSubmit={handleSubmit(onSubmit)}
        onError={() => {
          alert('Submission has failed.');
        }}
      >
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

        <div className=' flex items-center'>
          <label
            htmlFor='nickname'
            className='mr-2 text-gray-600 font-bold float-left w-24 text-right text-sm '
          >
            <span className='align-middle text-red-500'>*</span> 닉네임
          </label>

          <input
            type='text'
            placeholder='닉네임 입력'
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: {
                value: 2,
                message: '닉네임은 두글자 이상으로 해주세요',
              },
              maxLength: {
                value: 5,
                message: '닉네임은 다섯글자 이하로 해주세요',
              },
            })}
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
            placeholder='비밀번호 입력'
            {...register('password', {
              required: '비밀번호를 입력해주세요',
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
            placeholder='비밀번호 재확인'
            {...register('passwordCheck', {
              required: '비밀번호 재확인을 입력해주세요',
              maxLength: {
                value: 6,
                message: '6글자이하로 입력해주세요',
              },
              minLength: {
                value: 6,
                message: '6글자까지 입력해주세요.',
              },
              validate: {
                check: (val) => {
                  if (getValues('password') !== val) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                },
              },
            })}
            className='border rounded w-60 float-left px-2 py-1 text-sm'
          />
        </div>
        {errors && (
          <p className='text-[tomato] text-xs mt-1'>
            {errors.email?.message ||
              errors.nickname?.message ||
              errors.password?.message ||
              errors.passwordCheck?.message}
          </p>
        )}
        <button
          className={`${
            isValid
              ? 'w-40 py-1 mt-6 font-bold text-white rounded transition-all postBtn'
              : 'w-40 py-1 mt-6 bg-gray-200 text-white rounded transition-all font-normal'
          } `}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
