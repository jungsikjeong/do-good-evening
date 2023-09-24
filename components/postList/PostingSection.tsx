import PostList from './PostList';

const PostingSection = ({ moveSectionDown }: any) => {
  return (
    <section className='section w-full h-full'>
      <PostList moveSectionDown={moveSectionDown} />
    </section>
  );
};

export default PostingSection;
