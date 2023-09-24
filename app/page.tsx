'use client';

import { useEffect, useState } from 'react';
import AuthModal from '@/components/AuthModal';
import FullPages from '@/components/FullPages';
import LoginBtn from '@/components/LoginBtn';
import PostModal from '@/components/PostModal';

import { HiOutlinePencilSquare } from 'react-icons/hi2';

export default function Home() {
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // 모바일 화면인지 체크
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {/* Auth Modal(로그인버튼을 클릭하면 열림)*/}
      {authModal && (
        <AuthModal authModal={authModal} setAuthModal={setAuthModal} />
      )}

      {/* Post Modal(글쓰기 버튼을 클릭하면 열림) */}
      {postModal && (
        <PostModal postModal={postModal} setPostModal={setPostModal} />
      )}

      {/* 로그인 버튼 */}
      <LoginBtn setAuthModal={setAuthModal} />

      <FullPages />

      {/* TO DO: user접속시에만 보이게하기 */}
      {/* 글쓰기 버튼 */}
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
    </div>
  );
}
