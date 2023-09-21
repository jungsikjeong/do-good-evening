import PostSwiper from './PostSwiper';

const PostingSection = ({ moveSectionDown }: any) => {
  return (
    <div className='section w-full h-full'>
      <PostSwiper moveSectionDown={moveSectionDown} />
    </div>
  );
};

export default PostingSection;
