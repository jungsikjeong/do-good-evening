import { motion } from 'framer-motion';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiShareAlt } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

const MainPosting = ({ onClick }: any) => {
  return (
    <li className='relative col-span-2 row-span-2 overflow-hidden cursor-pointer'>
      <Link href='/detail'>
        <Image
          src='/images/example0.jpg'
          alt=''
          className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
          fill
        />

        <h1 className='absolute top-0 text-white text-lg px-2 py-4'>
          정두굿님의 저녁
        </h1>

        <div
          className='absolute bottom-4 px-2 flex flex-col 
              text-white '
        >
          <p>8:30:48 PM EST</p>

          <p>부천</p>
        </div>

        <div className='absolute text-white right-4 bottom-4 text-3xl max-md:text-2xl'>
          {/* 좋아요 버튼*/}
          <button onClick={onClick} className='mr-4'>
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

          {/* 공유하기 버튼*/}
          <button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.97,
                opacity: 0.6,
              }}
            >
              <BiShareAlt />
            </motion.div>
          </button>
        </div>
      </Link>
    </li>
  );
};

export default MainPosting;
