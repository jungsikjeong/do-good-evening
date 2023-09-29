import { motion } from 'framer-motion';
import { FcLikePlaceholder } from 'react-icons/fc';
import { BiShareAlt } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { PostProps } from '@/app/mypage/page';
import { FcLike } from 'react-icons/fc';

interface MainPostingProps {
  onClick: any;
  data: PostProps;
  userInfo: any;
}

const MainPosting = ({ onClick, data, userInfo }: MainPostingProps) => {
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
          {data?.nickname}님의 저녁
        </h1>

        <div
          className='absolute bottom-4 px-2 flex flex-col 
              text-white '
        >
          <p>{data?.createdAt.slice(12)} EST</p>

          <p>{data?.country}</p>
        </div>
      </Link>
      <div className='absolute text-white right-4 bottom-4 text-3xl max-md:text-2xl'>
        {/* 좋아요 버튼*/}
        <button onClick={() => onClick()}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.97,
              opacity: 0.6,
            }}
          >
            {data?.like?.length === 0 ? (
              <FcLike className='svg_color' />
            ) : (
              <>
                {data?.like?.map((like) =>
                  like.likeUser === userInfo?.uid ? (
                    <FcLikePlaceholder
                      className='svg_color-red'
                      key={`unLike-${like}`}
                    />
                  ) : (
                    <FcLike className='svg_color' key={`like-${like}`} />
                  )
                )}
              </>
            )}
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
    </li>
  );
};

export default MainPosting;
