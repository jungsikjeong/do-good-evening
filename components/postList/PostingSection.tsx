import PostList from './PostList';

const PostingSection = ({ moveSectionDown }: any) => {
  return (
    <div className='section w-full h-full'>
      <PostList moveSectionDown={moveSectionDown} />
    </div>
  );
};

export default PostingSection;
