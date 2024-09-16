'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function UnsubscribePage() {
  useEffect(() => {
    sendGAEvent('event', 'view-unsubscribe');
  }, []);

  return (
    <p
      className={
        'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'
      }>
      구독 취소를 성공적으로 완수하였다.
    </p>
  );
}
