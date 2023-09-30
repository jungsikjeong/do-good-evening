import { PostProps } from '@/app/mypage/page';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../LikeButton';

interface SubPostingProps {
  data: PostProps;
}

const SubPosting = ({ data }: SubPostingProps) => {
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
        <LikeButton post={data} />
      </div>
    </li>
  );
};

export default SubPosting;
