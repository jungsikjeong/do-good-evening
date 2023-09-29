import { PostProps } from '@/app/mypage/page';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

interface SubPostingProps {
  onClick: any;
  data: PostProps;
  userInfo: any;
}

const SubPosting = ({ onClick, data, userInfo }: SubPostingProps) => {
  return (
    <li className='relative max-md:col-span-2 overflow-hidden cursor-pointer'>
      <Link href='/detail'>
        <Image
          src='/images/example0.jpg'
          alt=''
          className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
          width={306}
          height={172}
        />

        <h1
          className='absolute top-0 text-white text-lg p-2 max-lg:text-base
    max-md:text-sm
    '
        >
          {data?.nickname}님의 저녁
        </h1>

        <div
          className='absolute bottom-4 px-2 flex flex-col 
      text-white max-md:text-xs max-lg:text-xs'
        >
          <p>{data?.createdAt.slice(12)} EST</p>

          <p>{data?.country}</p>
        </div>
      </Link>
      <div className='absolute text-white right-3 bottom-3 text-3xl max-md:text-xl max-lg:text-base'>
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
      </div>
    </li>
  );
};

export default SubPosting;
