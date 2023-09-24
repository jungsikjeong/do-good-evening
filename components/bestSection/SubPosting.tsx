import { motion } from 'framer-motion';
import Link from 'next/link';
import { FcLikePlaceholder } from 'react-icons/fc';

const SubPosting = ({ onClick }: any) => {
  return (
    <li className='relative max-md:col-span-2 overflow-hidden cursor-pointer'>
      <Link href='/'>
        <img
          src='/images/example0.jpg'
          alt=''
          className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
        />

        <h1
          className='absolute top-0 text-white text-lg p-2
    max-md:text-sm
    '
        >
          정두굿님의 저녁
        </h1>

        <div
          className='absolute bottom-4 px-2 flex flex-col 
      text-white max-md:text-xs'
        >
          <p>8:30:48 PM EST</p>

          <p>부천</p>
        </div>

        <div className='absolute text-white right-3 bottom-3 text-3xl max-md:text-xl'>
          {/* 좋아요 버튼*/}
          <button onClick={onClick}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.97,
                opacity: 0.6,
              }}
            >
              <FcLikePlaceholder className='svg_color' />
            </motion.div>
          </button>
        </div>
      </Link>
    </li>
  );
};

export default SubPosting;
