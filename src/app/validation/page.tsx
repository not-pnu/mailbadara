export default function ValidationEmailPage({ searchParams: { email } }: { searchParams: { email: string } }) {
    return (
        <main className={'flex flex-col items-center bg-black text-center text-white'}>
            <div className={'relative min-h-screen w-full max-w-1440'}>
                <h1 className={'text-295 font-bold leading-295 xl:text-400'}>메일 받아라</h1>
                <p className={'flex h-240 flex-col items-center justify-center font-NanumMyeongjo'}>
                    {email}
                    <br />
                    <br />
                    구독을 성공적으로 완료한 것을 축하한다.
                </p>
            </div>
        </main>
    );
}
