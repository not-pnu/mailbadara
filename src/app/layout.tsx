import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '메일바다라',
  description: '부산대학교 메일을 뉴스레터로. 매일매일 메일을 받을 수 있다.',
  keywords:
    '부산대학교, 뉴스레터, 메일바다라, 메일받아라, KimCookieYa, 김쿠키야, 부산대아님, mailbadara, MailBadara',
  openGraph: {
    title: '메일바다라',
    description:
      '부산대학교 메일을 뉴스레터로! 매일매일 메일을 받을 수 있어요!',
    siteName: '메일바다라',
    url: process.env.NEXT_PUBLIC_APP_URL,
    type: 'website',
    images: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL + '/image/not-pnu-logo.png',
        width: 500,
        height: 500,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={'relative'}>
        <main
          className={
            'flex flex-col items-center bg-black text-center text-white'
          }>
          <div
            className={
              'scroll-hidden relative flex h-screen min-h-screen max-w-1440 flex-col overflow-y-scroll'
            }>
            <h1
              className={
                'text-295 font-bold leading-295 md:text-120 md:leading-144'
              }>
              메일
              <br className={'hidden md:block'} /> 받아라
            </h1>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
