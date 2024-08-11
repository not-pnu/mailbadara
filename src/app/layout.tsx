import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: '메일바다라',
    description: 'Generated by KimCookieYa',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={'relative'}>
                <main className={'flex flex-col items-center bg-black text-center text-white'}>
                    <div
                        className={
                            'scroll-hidden relative flex h-screen min-h-screen max-w-1440 flex-col overflow-y-scroll'
                        }
                    >
                        <h1 className={'text-295 font-bold leading-295 md:text-120 md:leading-144'}>
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
