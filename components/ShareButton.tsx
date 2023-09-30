import { kakaoClipboard } from 'react-kakao-share';
import { motion } from 'framer-motion';
import { BiShareAlt } from 'react-icons/bi';
import { PostProps } from '@/app/mypage/page';

interface ShareButtonProps {
  post: PostProps;
}

const ShareButton = ({ post }: ShareButtonProps) => {
  const onPostingShareClick = (data: any) => {
    const image = data?.imageUrl
      ? data?.imageUrl
      : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbnK2OT%2Fbtsv8UuRUdf%2F2GMlvba3o7hnuSfjIOyZKk%2Fimg.jpg';

    const clipData = {
      title: '오늘 하루도 평안히..',
      description: data?.content,
      image: image,
      APIKEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
    };

    kakaoClipboard(clipData);
  };

  return (
    <button onClick={() => onPostingShareClick(post)}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{
          scale: 0.97,
          opacity: 0.6,
        }}
      >
        <BiShareAlt />
      </motion.div>
    </button>
  );
};

export default ShareButton;
