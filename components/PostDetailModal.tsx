'use client';

import { postDetailInfo } from '@/recoil/postDetailModalAtoms';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';

const PostDetailModal = () => {
  const postDetailInfoState = useRecoilValue(postDetailInfo);
  console.log(postDetailInfoState);
  return (
    <div
      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-2/3 h-2/3
    max-md:w-80 max-md:h-80 cursor-pointer'
    >
      <div className='relative w-full h-full text-white max-md:text-sm'>
        {postDetailInfoState?.imgUrl ? (
          <Image src={postDetailInfoState?.imgUrl} alt='' fill />
        ) : (
          <Image src='/images/example0.jpg' alt='' fill />
        )}

        <div className='absolute bottom-0 w-full p-4 z-60 authBgColor'>
          <p className='max-sm:hidden'>
            {postDetailInfoState?.nickname}님이 올리신 저녁노을입니다.
          </p>
          <p className='max-sm:hidden'>
            {postDetailInfoState?.nickname}님은 이 노을을 보며 이런 생각을
            하셨습니다.
            <br />
            <br />
          </p>
          <p className='text-center font-bold'>
            '{postDetailInfoState?.content}'
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
