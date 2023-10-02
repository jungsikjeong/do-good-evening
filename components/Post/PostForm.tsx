'use client';

import { PostModalProps } from '.';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '@/recoil/userAtoms';
import Image from 'next/image';
import { COUNTRIES } from '@/utils/countryNames';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { app, db } from '@/firebaseApp';
import { PostProps } from '@/app/mypage/page';

import Loading from '../Loading';
import { observerState } from '@/recoil/postObserverAtoms';

const PostForm = ({ setPostModal, postId, setIsPostEdit }: PostModalProps) => {
  // 한글 나라이름 순서대로 정렬
  const [sortByCountryName, setSortByCountryName] = useState(
    [...COUNTRIES].sort((a, b) => {
      return a.koreanName.localeCompare(b.koreanName);
    })
  );
  const [imgUrl, setImgUrl] = useState<string | null>('');
  const [oldImgUrl, setOldImgUrl] = useState<string | null>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [country, setCountry] = useState('대한민국');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostProps>();

  const userInfo = useRecoilValue(user);
  const setObserver = useSetRecoilState(observerState);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'content') {
      setContent(value);
    }
    if (name === 'country') {
      setCountry(value);
    }
  };

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();

      if (!file.type.match('image.*')) {
        toast.warn('이미지 파일만 업로드 가능합니다.', {
          position: 'top-center',
        });
        return;
      }
      reader.readAsDataURL(file);

      setImgFile(file);
      reader.onload = function () {
        setImgUrl(reader.result as string);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length === 0 || content.length < 5) {
      return toast.warn('내용은 최소 다섯글자 이상 작성해주세요', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    let imgAddress;
    let imgName;

    try {
      if (!userInfo) {
        toast?.error('로그인이 필요한 서비스입니다. 로그인해주세요!', {
          position: 'top-center',
        });
        return; // 로그인되지 않았을 경우 함수 종료
      }

      // 만약 post 데이터가 있다면,  데이터 수정
      if (postId) {
        // 이미지를 업로드 및 수정했을 때
        if (imgFile) {
          imgName = `${uuidv4()}_${imgFile.name}`;

          const storage = getStorage(app);
          const storageRef = ref(storage, `images/${imgName}`);

          if (oldImgUrl) {
            // 기존 이미지 삭제
            const desertRef = ref(storage, oldImgUrl as string);
            await deleteObject(desertRef);
          }

          // 새로운 이미지 업로드
          await uploadBytes(storageRef, imgFile);
          imgAddress = await getDownloadURL(ref(storage, `images/${imgName}`));

          // 게시물 업로드
          const postRef = doc(db, 'posts', postId);
          await updateDoc(postRef, {
            nickname: userInfo?.nickname,
            content: content,
            country: country,
            imgUrl: imgFile ? imgAddress : '',
            updatedAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          toast.success('게시물을 수정했습니다');
          setIsPostEdit && setIsPostEdit(true);
        } else {
          // 이미지 없이 내용만 수정했을 경우
          const postRef = doc(db, 'posts', postId);
          await updateDoc(postRef, {
            nickname: userInfo?.nickname,
            content: content,
            country: country,
            imgUrl: imgUrl ? imgUrl : '',
            updatedAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          toast.success('게시물을 수정했습니다');
          setIsPostEdit && setIsPostEdit(true);
        }
      } else {
        // 처음 게시글 업로드할 때
        if (imgFile) {
          imgName = `${uuidv4()}_${imgFile.name}`;

          const storage = getStorage(app);
          const storageRef = ref(storage, `images/${imgName}`);

          await uploadBytes(storageRef, imgFile);

          imgAddress = await getDownloadURL(ref(storage, `images/${imgName}`));
        }

        await addDoc(collection(db, 'posts'), {
          content: content,
          country: country,
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          imgUrl: imgFile ? imgAddress : '',

          nickname: userInfo?.nickname,
          like: [],
          uid: userInfo?.uid,
        });

        // 유저 도큐먼트에서 postCount 1증가
        const userRef = doc(db, 'users', userInfo?.uid);
        await updateDoc(userRef, {
          postCount: increment(1),
        });

        toast?.success('게시글을 생성했습니다.', { position: 'top-center' });
      }
      setObserver(true);
      setPostModal(false);
    } catch (error: any) {
      console.log(error);
      toast?.error(error?.code, { position: 'top-center' });
      setIsPostEdit && setIsPostEdit(false);
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (postId) {
      getPost(postId);
    } else {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (post) {
      setImgUrl(post.imgUrl);
      setOldImgUrl(post.imgUrl);
      setCountry(post.country);
      setContent(post.content);
      setLoading(false);
    }
  }, [post]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='relative w-96 h-72 max-md:w-80 max-md:mt-6'>
          <Image
            src={imgUrl ? imgUrl : '/images/example1.jpg'}
            alt='기본이미지'
            fill
            className='border rounded'
          />
        </div>

        <button className='flex justify-center items-center bg-gray-400 w-32 h-8 mt-3 rounded hover:bg-gray-500 transition-none'>
          <label
            htmlFor='input-file'
            className=' w-full h-full flex justify-center items-center cursor-pointer transition-all'
          >
            <AiOutlineCloudUpload className='svg__upload' />
            <input
              type='file'
              name='input-file'
              id='input-file'
              accept='image/*'
              // multiple
              style={{ display: 'none' }}
              onChange={(e) => onFileUpload(e)}
            />
          </label>
        </button>
      </div>

      <div
        className='flex flex-col items-center w-96 m-auto
         max-w-xs'
      >
        <h1 className='text-black font-bold text-center max-md:absolute max-md:top-2'>
          당신의 저녁을 공유해주세요.
        </h1>

        <div className='mt-8 max-md:mt-2'>
          {/* 나라 선택 */}
          <div className='flex items-center mb-4'>
            <label htmlFor='category' className='w-1/2 font-semibold text-sm'>
              당신은 어디에 있나요?
            </label>
            <select
              name='country'
              id='country'
              defaultValue={country}
              onChange={onChange}
              className='w-1/2  p-1 rounded scrollable-list'
            >
              <option value='' className='bg-gray-100 '>
                나라를 선택해주세요
              </option>

              {sortByCountryName?.map((country) => (
                <option
                  value={country?.koreanName}
                  key={country?.koreanName}
                  className='bg-gray-100'
                >
                  {country?.koreanName}
                </option>
              ))}
            </select>
          </div>

          {/* 내용 입력 칸 */}
          <form className='flex flex-col' onSubmit={onSubmit}>
            <textarea
              name='content'
              id='content'
              required
              className='rounded h-[10.5rem] p-2'
              placeholder='당신의 저녁을 공유해주세요.'
              onChange={onChange}
              value={content}
            />

            <button
              className='m-auto flex justify-center items-center 
               w-32 h-8 mt-3 transition-all hover:shadow-md'
              style={{
                backgroundImage: 'linear-gradient(to right, #FFD700, #FFA500)',
                borderImage: 'linear-gradient(to right, #FFD700, #FFA500)',
                borderImageSlice: '1',
                borderRadius: '5px',
              }}
            >
              저녁 공유
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostForm;
