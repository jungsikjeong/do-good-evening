'use client';

import { useEffect, useState } from 'react';
import AuthModal from '@/components/AuthModal';
import FullPages from '@/components/FullPages';
import LoginBtn from '@/components/Auth';
import PostModal from '@/components/Post';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useKakaoScript } from 'react-kakao-share';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebaseApp';
import Loading from '@/components/Loading';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '@/recoil/userAtoms';
import PostingButton from '@/components/PostingButton';

export default function Home() {
  useKakaoScript();
  const auth = getAuth(app);

  const [authModal, setAuthModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);

  const [init, setInit] = useState<boolean>(true);

  const userInfo = useRecoilValue(user);
  const setUser = useSetRecoilState(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const userData = {
          email: user.email,
          nickname: user.displayName,
          uid: user.uid,
        };
        setUser(userData);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
      setInit(false);
    });
  }, [auth]);

  if (init) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />

      {/* Auth Modal(로그인버튼을 클릭하면 열림)*/}
      {authModal && <AuthModal setAuthModal={setAuthModal} />}

      {/* Post Modal(글쓰기 버튼을 클릭하면 열림) */}
      {postModal && <PostModal setPostModal={setPostModal} />}

      {/* 로그인 버튼 */}
      <LoginBtn setAuthModal={setAuthModal} />

      <FullPages />

      {/* 글쓰기 버튼 */}
      {userInfo && <PostingButton setPostModal={setPostModal} />}
    </>
  );
}
