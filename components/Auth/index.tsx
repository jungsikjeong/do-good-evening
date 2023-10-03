'use client';

import { AiOutlineLogin } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import UserBtn from './UserBtn';

interface LoginBtnProps {
  setAuthModal: React.Dispatch<SetStateAction<boolean>>;
}

const LoginBtn = ({ setAuthModal }: LoginBtnProps) => {
  const userInfo = useRecoilValue(user);

  return (
    <>
      {userInfo ? (
        <UserBtn />
      ) : (
        <button
          className='absolute top-20 right-10 text-gray-100 text-5xl z-10 max-md:text-4xl max-md:right-2'
          onClick={() => setAuthModal(true)}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.97,
              opacity: 0.6,
            }}
          >
            <AiOutlineLogin />
          </motion.div>
        </button>
      )}
    </>
  );
};

export default LoginBtn;
