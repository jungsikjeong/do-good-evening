'use client';

import { SetStateAction } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { motion } from 'framer-motion';
import PostForm from './PostForm';

interface PostModalProps {
  setPostModal: React.Dispatch<SetStateAction<boolean>>;
}

const PostModal = ({ setPostModal }: PostModalProps) => {
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

        <PostForm setPostModal={setPostModal} />
      </div>
    </div>
  );
};

export default PostModal;
