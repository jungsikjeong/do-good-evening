'use client';

import { postInfo } from '@/recoil/postInfoModalAtoms';
import { useRecoilValue } from 'recoil';

const PostInfoModal = () => {
  const postModalState = useRecoilValue(postInfo);

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
      <div className='authBgColor w-80 text-white p-4 max-md:text-sm'>
        <p className=''>
          {postModalState?.nickname}님이 올리신 저녁노을입니다.
        </p>
        <p className=''>
          {postModalState?.nickname}님은 이 노을을 보며 이런 생각을 하셨습니다.
        </p>
        <br />
        <p className='text-center font-bold'>'{postModalState?.content}'</p>
      </div>
    </div>
  );
};

export default PostInfoModal;
