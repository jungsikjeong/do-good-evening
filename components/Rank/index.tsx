import { GiSunset } from 'react-icons/gi';
import { BiLike } from 'react-icons/bi';
import { ImPencil2 } from 'react-icons/im';

const Rank = () => {
  const ranking = new Array(7).fill(null);

  return (
    <section className='section w-full h-full bg-[#282c34]'>
      <ul className='max-w-5xl flex m-auto gap-10 text-gray-200'>
        <li className='w-full flex flex-col gap-1 h-80 overflow-y-auto scrollable-list'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 저녁을 나눈 두굿이들</h3>
            <GiSunset />
          </div>

          {/* 가장 베스트 유저 1~3위*/}
          <div className='flex justify-around py-4 border-b-2 border-gray-400'>
            <div className='flex gap-1 flex-col items-center'>
              <img className='w-6 h-6' src='/images/gold.png' alt='' />
              <p>리신</p>
              <div className='flex justify-center items-center gap-1 text-base'>
                <ImPencil2 />
                <BiLike />
                <p className='pl-3'>2121</p>
              </div>
            </div>

            <div className='flex gap-1 flex-col items-center'>
              <img className='w-6 h-6' src='/images/silver.png' alt='' />
              <p>리산드라</p>
              <div className='flex justify-center items-center gap-1 text-base'>
                <ImPencil2 />
                <BiLike />
                <p className='pl-3'>2121</p>
              </div>
            </div>

            <div className='flex gap-1 flex-col items-center'>
              <img className='w-6 h-6' src='/images/bronze.png' alt='' />
              <p>미스포춘</p>
              <div className='flex justify-center items-center gap-1 text-base'>
                <ImPencil2 />
                <BiLike />
                <p className='pl-3'>2121</p>
              </div>
            </div>
          </div>

          {/* 가장 많이 주목을 받은 유저 4~10위 */}
          {ranking.map((data, index) => (
            <div
              className='flex item-center p-2 border-b-[1px] border-gray-400'
              key={data}
            >
              <p className='mr-auto'>
                <span className='pr-2'>{index + 4}</span>
                풀생강차
              </p>
              <div className='flex items-center gap-1'>
                <ImPencil2 />
                <BiLike />
                <p className='pl-2'>593</p>
              </div>
            </div>
          ))}
        </li>

        <li className='w-full flex flex-col gap-1 h-80 overflow-y-auto scrollable-list'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 저녁을 나눈 나라들</h3>
            <GiSunset />
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/gold.png' alt='' />
              대한민국
            </div>
            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/silver.png' alt='' />
              대한민국 대한민국 대한민국
            </div>

            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/bronze.png' alt='' />
              대한민국
            </div>

            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          {ranking.map((data, index) => (
            <div
              className='flex item-center p-2 border-b-[1px] border-gray-400'
              key={data}
            >
              <div className='flex gap-2 mr-auto'>{index + 4} 대한민국</div>

              <div className='flex items-center gap-1'>
                <ImPencil2 />
                <p className='pl-2'>593</p>
              </div>
            </div>
          ))}
        </li>

        <li className='w-full flex flex-col gap-1 h-80 overflow-y-auto scrollable-list'>
          <div className='flex items-center gap-1 text-lg py-1 border-b-2 border-gray-400'>
            <h3>가장 많이 주목을 받은 저녁</h3>
            <GiSunset />
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/gold.png' alt='' />
              대한민국
            </div>
            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/silver.png' alt='' />
              대한민국 대한민국 대한민국
            </div>

            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          <div className='flex item-center p-2 border-b-[1px] border-gray-400'>
            <div className='flex mr-auto gap-2'>
              <img className='w-6 h-6' src='/images/bronze.png' alt='' />
              대한민국
            </div>

            <div className='flex items-center gap-1'>
              <ImPencil2 />
              <p className='pl-2'>593</p>
            </div>
          </div>

          {ranking.map((data, index) => (
            <div
              className='flex item-center p-2 border-b-[1px] border-gray-400'
              key={data}
            >
              <div className='flex gap-2 mr-auto'>{index + 4} 대한민국</div>

              <div className='flex items-center gap-1'>
                <ImPencil2 />
                <p className='pl-2'>593</p>
              </div>
            </div>
          ))}
        </li>
      </ul>
    </section>
  );
};

export default Rank;
