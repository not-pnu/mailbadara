'use client';

import { useSubscribeFormStore } from '@/stores/useSubscribeFormStore';
import { EDescription } from '@/enums/subscribe';

export default function DescriptionSection() {
    const descriptionType = useSubscribeFormStore((state) => state.descriptionType);
    const getDescription = () => {
        switch (descriptionType) {
            case EDescription.DEFAULT:
                return <DefaultDescription />;
            case EDescription.WARNING:
                return <WarningDescription />;
            case EDescription.BRANCH:
                return <BranchDescription />;
            case EDescription.WAITING:
                return <WaitingDescription />;
            case EDescription.ALERT_MAIL:
                return <AlertMailDescription />;
            case EDescription.DUPLICATE:
                return <DuplicateDescription />;
            case EDescription.ERROR:
                return <ErrorDescription />;
            default:
                return <DefaultDescription />;
        }
    };

    return <div className={'flex h-240 flex-col items-center justify-center'}>{getDescription()}</div>;
}

function DefaultDescription() {
    return (
        <>
            <p className={'mt-12 font-NanumMyeongjo text-18'}>
                학과를 고르고
                <br />
                이메일을 입력하라
            </p>
            <p className={'mt-48 font-NanumMyeongjo text-18'}>
                그리하면
                <br />
                원하는 것을 손에 넣을 수 있을 것이다
            </p>
        </>
    );
}

function WarningDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18'}>똑바로 입력해라.</p>;
}

function BranchDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18'}>선택의 시간이다.</p>;
}

function WaitingDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18'}>...</p>;
}

function AlertMailDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18'}>이메일을 확인해라.</p>;
}

function DuplicateDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18'}>이미 구독 중이다.</p>;
}

function ErrorDescription() {
    return <p className={'mt-12 font-NanumMyeongjo text-18 text-red-500'}>문제가 발생했다.</p>;
}
