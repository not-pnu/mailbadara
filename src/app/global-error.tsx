'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    sendGAEvent('event', 'view-global-error');
  }, []);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
      </body>
    </html>
  );
}
