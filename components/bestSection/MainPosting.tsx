import Link from 'next/link';
import Image from 'next/image';
import { PostProps } from '@/app/mypage/page';
import ShareButton from '../ShareButton';
import LikeButton from '../LikeButton';

interface MainPostingProps {
  data: PostProps;
  styles: boolean;
}

const MainPosting = ({ data, styles }: MainPostingProps) => {
  return (
    // <li className='relative col-span-2 row-span-2 overflow-hidden cursor-pointer'>
    <li
      className={
        styles
          ? `relative w-96 h-[250px] col-span-2 row-span-2 overflow-hidden cursor-pointer`
          : 'relative max-md:h-auto col-span-2 row-span-2 overflow-hidden cursor-pointer'
      }
    >
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
        <LikeButton post={data} />

        {/* 공유하기 버튼*/}
        <ShareButton post={data} />
      </div>
    </li>
  );
};

export default MainPosting;
