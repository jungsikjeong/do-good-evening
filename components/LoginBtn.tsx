'use client';

import { AiOutlineLogin } from 'react-icons/ai';
import { motion } from 'framer-motion';

const LoginBtn = () => {
  return (
    <button className='ml-auto text-gray-100 text-5xl max-md:text-4xl'>
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
  );
};

export default LoginBtn;
