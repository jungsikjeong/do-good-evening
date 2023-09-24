'use client';

import ReactFullpage from '@fullpage/react-fullpage';
import PostingSection from './postList/PostingSection';
import Map from './Map';
import BestSection from './bestSection';
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

          {/* SECTION 2 : 지도 섹션 */}
          <Map moveSectionDown={() => fullpageApi.moveSectionDown()} />

          <BestSection moveSectionDown={() => fullpageApi.moveSectionDown()} />
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default FullPages;
