'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessSubscribe() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    if (!email) {
        return (
            <p className={'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'}>
                이메일 주소를 찾을 수 없다.
            </p>
        );
    }

    return (
        <p className={'flex h-240 flex-col items-center justify-center font-NanumMyeongjo md:text-18'}>
            {email}
            <br />
            <br />
            구독을 성공적으로 완료한 것을 축하한다.
        </p>
    );
}
