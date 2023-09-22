'use client';

import { useEffect, useState } from 'react';
import MapChart from './MapChart';

const Map = ({ moveSectionDown }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // 768px 이하일 때를 모바일로 판단
    };

    // 초기 실행
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <MapChart isMobile={isMobile} moveSectionDown={moveSectionDown} />;
};

export default Map;
