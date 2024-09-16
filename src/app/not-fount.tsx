'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function NotFountPage() {
  useEffect(() => {
    sendGAEvent('event', 'view-not-found');
  }, []);
  return (
    <p
      className={
        'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'
      }>
      서버에 문제가 발생했습니다:)
      <br />
      <br /> 개발자(blueclub651@gmail.com)에게 문의 바랍니다.
    </p>
  );
}
