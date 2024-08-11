export default function ValidationEmailPage({ searchParams: { email } }: { searchParams: { email: string } }) {
    return (
        <p className={'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'}>
            {email}
            <br />
            <br />
            구독을 성공적으로 완료한 것을 축하한다.
        </p>
    );
}
