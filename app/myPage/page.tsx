'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { app, db } from '@/firebaseApp';
import Loading from '@/components/Loading';
import UserBtn from '@/components/Auth/UserBtn';
import PostModal from '@/components/Post';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isPostDetailModal,
  postDetailInfo,
} from '@/recoil/postDetailModalAtoms';
import PostDetailModal from '@/components/PostDetailModal';

export interface PostProps {
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

export type likeType = {
  likeUser: string;
};

const MyPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [postId, setPostId] = useState<string>('');
  const [postModal, setPostModal] = useState<boolean>(false);
  const [isPostEdit, setIsPostEdit] = useState<boolean>(false); // 포스트가 변경되었는지 확인
  const [user, setUser] = useState<any>();

  const postModalState = useRecoilValue(isPostDetailModal);
  const setPostModalState = useSetRecoilState(isPostDetailModal);
  const setPostInfo = useSetRecoilState(postDetailInfo);

  // Text content does not match server-rendered HTML
  // 위의 에러때문에  recoil user state 사용을 못함
  // useEffect에서 useState에 저장하는식으로 하려고했는데 새로고침하면 처음 언디파인이 떠서 이렇게해줬음
  // if (typeof window !== 'undefined') {
  //   const user = JSON.parse(localStorage.getItem('user') as string);
  // }
  const getPosts = async () => {
    // posts 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');
    let postQuery;
    const user = JSON.parse(localStorage.getItem('user') as string);

    postQuery = query(
      postRef,
      where('uid', '==', user.userState.uid),
      orderBy('createdAt', 'asc')
    );

    const datas = await getDocs(postQuery);

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });

    setLoading(false);
  };

  const onPostClick = (data: PostProps) => {
    setPostModalState((prev) => !prev);
    setPostInfo(data);
  };

  const onEditBtnClick = (postId: string) => {
    setPostId(postId);
    setPostModal(true);
  };

  const onPostDelete = async (postId: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      if (postId) {
        try {
          const docRef = doc(db, 'posts', postId);
          const docSnap = await getDoc(docRef);

          if (docSnap.data()) {
            const storage = getStorage(app);

            // 이미지 삭제
            const desertRef = ref(storage, docSnap?.data()?.imgUrl);
            await deleteObject(desertRef);

            // 게시글 삭제
            await deleteDoc(doc(db, 'posts', postId));

            toast.success('게시글을 삭제했습니다.', { position: 'top-center' });
            getPosts();
          }
        } catch (error: any) {
          toast.error(error?.code, { position: 'top-center' });
        }
      }
    }
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('user') as string);
    if (localState) {
      setUser(localState);
    }

    if (!localState || localState.userState === null) {
      toast.warn('로그인을 해주세요', { position: 'top-center' });
      redirect('/');
    }
  }, []);

  useEffect(() => {
    if (isPostEdit) {
      getPosts();
      setIsPostEdit(false);
    }
  }, [isPostEdit]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading && <Loading />}

      {/* Post Modal(편집버튼을 누르면 열림) */}
      {postModal && (
        <PostModal
          setPostModal={setPostModal}
          postId={postId}
          setIsPostEdit={setIsPostEdit}
        />
      )}

      <section
        className='w-full h-screen bg-[#27445c] overflow-hidden'
        onClick={() => postModalState && setPostModalState(false)}
      >
        {postModalState && <PostDetailModal />}

        <div
          className='relative w-full max-w-7xl h-full m-auto p-4
          flex flex-col items-center justify-center pt-24
          max-sm:pt-44
          '
        >
          {user && <UserBtn hasNavigation={true} />}

          <h1 className='w-full text-white mb-4 text-left '>
            {user && user?.userState?.nickname}님의 저녁 기록들..
          </h1>

          <ul
            className='w-full h-[528px] overflow-y-auto scrollable-list
          grid grid-cols-5 gap-4
          max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2
          '
          >
            {posts.length > 0 ? (
              posts?.map((post) => (
                <div className='flex flex-col' key={post.id}>
                  <li
                    className='relative h-64 overflow-hidden cursor-pointer max-sm:h-48'
                    onClick={() => onPostClick(post)}
                  >
                    <Image
                      src={post.imgUrl ? post.imgUrl : '/images/example1.jpg'}
                      alt=''
                      fill
                      className='hover:scale-125 transition-all ease-linear duration-[0.3s]'
                    />
                    <div
                      className='absolute bottom-4 px-2 flex flex-col 
                    text-white '
                    >
                      <p>{post.createdAt.slice(12)} EST</p>
                      <p>{post.country}</p>
                    </div>
                  </li>
                  <div className='flex justify-end gap-4 p-2 text-white'>
                    <button
                      className=''
                      onClick={() => onEditBtnClick(post?.id as string)}
                    >
                      편집
                    </button>
                    <button
                      className=''
                      onClick={() => onPostDelete(post?.id as string)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-white opacity-40 text-center'>기록 없음</div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyPage;
