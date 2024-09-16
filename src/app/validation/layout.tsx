import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메일바다라 - 이메일검증',
  description: '부산대학교 메일을 뉴스레터로. 매일매일 메일을 받을 수 있다.',
};

export default function ValidationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
