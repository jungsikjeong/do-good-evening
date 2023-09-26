'use client';

import { RecoilRoot } from 'recoil';

function RecoilRootWrapper({ children }: any) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
