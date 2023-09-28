'use client';

import { v4 as uuidv4 } from 'uuid';
import { SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { user } from '@/recoil/userAtoms';
import Image from 'next/image';
import { COUNTRIES } from '@/utils/countryNames';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { app, db } from '@/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';

interface PostFormProps {
  setPostModal: React.Dispatch<SetStateAction<boolean>>;
}

const PostForm = ({ setPostModal }: PostFormProps) => {
  // 한글 나라이름 순서대로 정렬
  const [sortByCountryName, setSortByCountryName] = useState(
    [...COUNTRIES].sort((a, b) => {
      return a.koreanName.localeCompare(b.koreanName);
    })
  );
  const [imgUrl, setImgUrl] = useState<string | null>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [country, setCountry] = useState('대한민국');
  const [content, setContent] = useState('');

  const userInfo = useRecoilValue(user);

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

    let imgUrl;
    let imgName;

    try {
      if (imgFile) {
        imgName = `${uuidv4()}_${imgFile.name}`;

        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${imgName}`);

        await uploadBytes(storageRef, imgFile);

        imgUrl = await getDownloadURL(ref(storage, `images/${imgName}`));
      }

      await addDoc(collection(db, 'posts'), {
        content: content,
        country: country,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        imgUrl: imgFile ? imgUrl : '',
        email: userInfo?.email,
        nickname: userInfo?.nickname,
        like: [],
        uid: userInfo?.uid,
      });

      toast?.success('게시글을 생성했습니다.', { position: 'top-center' });
      setPostModal(false);
    } catch (error: any) {
      toast?.error(error?.code, { position: 'top-center' });
    }
  };

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
