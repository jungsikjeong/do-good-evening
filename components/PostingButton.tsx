import { SetStateAction } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

interface PostingButtonProps {
  isMobile: boolean;
  setPostModal: React.Dispatch<SetStateAction<boolean>>;
}

const PostingButton = ({ isMobile, setPostModal }: PostingButtonProps) => {
  return (
    <>
      {isMobile ? (
        <footer className='fixed right-4 bottom-4'>
          <button
            className='text-gray-200 border rounded border-gray-200 px-4 py-3 hover:bg-gray-50 hover:text-gray-600 transition-all'
            onClick={() => setPostModal(true)}
          >
            <HiOutlinePencilSquare size={25} />
          </button>
        </footer>
      ) : (
        <footer className='fixed right-16 bottom-14'>
          <button
            className='text-gray-200 border rounded-md border-gray-200 px-6 py-4 hover:bg-gray-50 hover:text-gray-600 transition-all'
            onClick={() => setPostModal(true)}
          >
            당신의 저녁을 공유해주세요
          </button>
        </footer>
      )}
    </>
  );
};

export default PostingButton;
