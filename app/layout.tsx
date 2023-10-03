import './globals.css';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'do-good-evening',
  description:
    '서로의 저녁 노을을 공유해 외롭지않은 저녁 그리고 굿이브닝을 실천하게 해주는 두굿이브닝 서비스입니다.',
  icons: {
    icon: '/favicon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='w-full h-scree'>
        <header className='fixed p-10 pb-0 z-10  max-md:p-2'>
          <Link href='/'>
            <Image
              src='/images/deg_logo.png'
              alt='로고'
              width={60}
              height={100}
            />
          </Link>
        </header>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
