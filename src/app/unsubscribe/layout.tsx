import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메일바다라 - 구독취소',
  description: '부산대학교 메일을 뉴스레터로. 매일매일 메일을 받을 수 있다.',
};

export default function UnsubscribeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
