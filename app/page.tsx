'use client';

import FullPages from '@/components/FullPages';
import LoginBtn from '@/components/LoginBtn';

export default function Home() {
  return (
    <div>
      {/* 로그인 버튼 */}
      <LoginBtn />

      <FullPages />

      {/* 글쓰기 버튼 */}
      <footer className='fixed right-16 bottom-14 max-md:hidden'>
        <button className='text-gray-200 border rounded-md border-gray-200 px-6 py-4 hover:bg-gray-50 hover:text-gray-600 transition-all'>
          당신의 저녁을 공유해주세요
        </button>
      </footer>
    </div>
  );
}
