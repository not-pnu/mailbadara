'use client';

import { useSubscribeFormStore } from '@/stores/useSubscribeFormStore';
import { EDescription } from '@/enums/subscribe';
import { cls } from '@/utils/tailwind';

export default function DescriptionSection() {
    const { descriptionType } = useSubscribeFormStore((state) => ({
        descriptionType: state.descriptionType,
    }));

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

    return (
        <div
            className={cls(
                'mt-12 flex h-240 w-full flex-col items-center justify-center font-NanumMyeongjo text-18',
                'md:h-fit',
            )}
        >
            {getDescription()}
        </div>
    );
}

function DefaultDescription() {
    return (
        <>
            <p>
                학과를 고르고
                <br />
                이메일을 입력하라
            </p>
            <p className={'mt-48'}>
                그리하면
                <br />
                원하는 것을 손에 넣을 수 있을 것이다
            </p>
        </>
    );
}

function WarningDescription() {
    return <p>똑바로 입력해라.</p>;
}

function BranchDescription() {
    return <p>선택의 시간이다.</p>;
}

function WaitingDescription() {
    return <p>...</p>;
}

function AlertMailDescription() {
    return <p>이메일을 확인해라.</p>;
}

function DuplicateDescription() {
    return <p>넌 이미 구독 중이다.</p>;
}

function ErrorDescription() {
    return <p className={'text-red-500'}>문제가 발생했다. 다음에 다시 오도록</p>;
}
