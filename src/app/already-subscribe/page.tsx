'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function AlreadySubscribePage() {
  useEffect(() => {
    sendGAEvent('event', 'view-already-subscribe');
  }, []);
  return (
    <p
      className={
        'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'
      }>
      이미 구독 중임.
    </p>
  );
}
