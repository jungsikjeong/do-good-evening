import { user } from '@/recoil/userAtoms';
import { SetStateAction } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

interface PostingButtonProps {
  setPostModal: React.Dispatch<SetStateAction<boolean>>;
}

const PostingButton = ({ setPostModal }: PostingButtonProps) => {
  const userInfo = useRecoilValue(user);

  const onClick = () => {
    if (userInfo) {
      setPostModal(true);
    } else {
      toast?.warning('로그인이 필요합니다.');
    }
  };

  return (
    <>
      {/* 모바일버전 */}
      <footer className='fixed right-4 bottom-4 hidden max-md:block'>
        <button
          className='text-gray-200 border rounded border-gray-200 px-4 py-3 hover:bg-gray-50 hover:text-gray-600 transition-all'
          onClick={onClick}
        >
          <HiOutlinePencilSquare size={25} />
        </button>
      </footer>

      {/* pc버전 */}
      <footer className='fixed right-16 bottom-14 max-md:hidden'>
        <button
          className='text-gray-200 border rounded-md border-gray-200 px-6 py-4 hover:bg-gray-50 hover:text-gray-600 transition-all'
          onClick={onClick}
        >
          당신의 저녁을 공유해주세요
        </button>
      </footer>
    </>
  );
};

export default PostingButton;
