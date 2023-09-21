'use client';

import ReactFullpage from '@fullpage/react-fullpage';
import PostingSection from './postList/PostingSection';
import Map from './Map';
import GroupPostings from './GroupPostings';
import Rank from './Rank';

type Credits = {
  enabled?: boolean;
  label?: string;
  position?: 'left' | 'right';
};

const credits: Credits = {
  enabled: true,
  label: '',
  position: 'left',
};
const FullPages = () => (
  <ReactFullpage
    //fullpage options
    credits={credits}
    licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'}
    scrollingSpeed={900}
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          {/* SECTION 1 : 포스팅 섹션 */}
          <PostingSection
            moveSectionDown={() => fullpageApi.moveSectionDown()}
          />

          <div className='section bg-red-500'>
            <p>Section 2</p>
          </div>

          <div className='section bg-red-400'>
            <p>Section 3</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default FullPages;
