'use client';

import { user } from '@/recoil/userAtoms';
import { stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  signOut,
} from 'firebase/auth';
import { app, db } from '@/firebaseApp';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';

/** 유저가 접속했을때 유저 닉네임 표시해주는 컴포넌트,
 *  유저 이름을 화면에 표시해주고, 클릭시 마이페이지, 로그아웃 버튼이 나타남 */

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'ul',
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
}

const UserBtn = ({ hasNavigation = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  const router = useRouter();

  const auth = getAuth(app);

  const userInfo = useRecoilValue(user);
  const setUser = useSetRecoilState(user);

  const onLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);

      hasNavigation && router.push('/');

      toast.success('로그아웃 되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onUserWithdrawal = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      const user = auth.currentUser;
      const storage = getStorage(app);

      if (user) {
        try {
          // 게시물 및 이미지 삭제
          const postsRef = collection(db, 'posts');
          const postQuery = query(postsRef, where('uid', '==', user?.uid));
          const datas = await getDocs(postQuery);

          datas.forEach(async (doc) => {
            try {
              // 게시글 삭제
              await deleteDoc(doc.ref);

              // 이미지 삭제
              const desertRef = ref(storage, doc.data()?.imgUrl);
              await deleteObject(desertRef);
            } catch (error: any) {
              console.error('Error deleting document:', error);
              toast.error(error?.code, { position: 'top-center' });
            }
          });

          // 사용자 삭제
          await deleteUser(user);

          // 로그아웃
          await signOut(auth);

          router.push('/');
          // 회원 탈퇴 완료 메시지
          toast?.success('회원 탈퇴가 완료되었습니다.', {
            position: 'top-center',
          });
        } catch (error: any) {
          console.error('Error:', error);
          toast?.error(error?.code, { position: 'top-center' });
        }
      }
    }
  };

  return (
    <div>
      <button className='absolute top-20 right-0 text-gray-100 text-xl z-10 max-md:-right-5 h-10 '>
        <nav className='menu relative px-6 h-0' ref={scope}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.97,
              opacity: 0.6,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {userInfo?.nickname}
          </motion.button>
          <ul
            style={{
              pointerEvents: isOpen ? 'auto' : 'none',
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              zIndex: 2,
            }}
            className='text-sm authBgColor'
          >
            <li className='p-4' onClick={onLogout}>
              로그아웃
            </li>
            {hasNavigation ? (
              <li className='p-4' onClick={onUserWithdrawal}>
                회원탈퇴
              </li>
            ) : (
              <li className='p-4'>
                <Link href='/mypage'>마이페이지</Link>
              </li>
            )}
          </ul>
        </nav>
      </button>
    </div>
  );
};

export default UserBtn;
