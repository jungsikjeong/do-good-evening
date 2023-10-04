import Image from 'next/image';
import LikeButton from '../LikeButton';

interface SubPostingProps {
  data: PostProps;
  onClick: (data: PostProps) => void;
}

interface PostProps {
  content: string;
  country: string;
  createdAt: string;
  email: string;
  imgUrl: string;
  id?: string;
  uid: string;
  nickname: string;
  like: likeType[];
}

type likeType = {
  likeUser: string;
};

const SubPosting = ({ data, onClick }: SubPostingProps) => {
  return (
    <li className='relative max-md:col-span-2 overflow-hidden cursor-pointer w-[306px] h-[172px] max-sm:w-40'>
      <Image
        src={data.imgUrl ? data.imgUrl : '/images/example1.jpg'}
        alt=''
        className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
        // width={306}
        fill
        // height={172}
        onClick={() => onClick(data)}
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
      <div className='absolute text-white right-3 bottom-3 text-3xl max-md:text-xl max-lg:text-base'>
        {/* 좋아요 버튼*/}
        <LikeButton post={data} />
      </div>
    </li>
  );
};

export default SubPosting;
