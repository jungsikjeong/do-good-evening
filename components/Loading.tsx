import Image from 'next/image';

const Loading = () => {
  return (
    <div className='w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-[#324047]'>
      <Image
        src='/images/loading.png'
        width={250}
        height={250}
        alt=''
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
      ></Image>
    </div>
  );
};

export default Loading;
