'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SubscribeForm() {
    const [step, setStep] = useState(1);
    const { register, handleSubmit } = useForm();

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    return (
        <form className={'flex w-full flex-col items-center gap-y-12'} onSubmit={handleSubmit(() => {})}>
            {step === 1 && (
                <div
                    id="department-list-section"
                    className={
                        'scroll-hidden flex h-144 w-440 flex-col overflow-y-scroll rounded-4 bg-white text-black'
                    }
                >
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                    <div className={'flex h-48 w-full items-center justify-between px-24'}>
                        <span className={'font-NanumMyeongjo text-24'}>학과를 선택하세요</span>
                        <span className={'font-NanumMyeongjo text-24'}>전체보기</span>
                    </div>
                </div>
            )}
            {step === 2 && (
                <input
                    className={'h-48 w-440 rounded-4 px-24 font-NanumMyeongjo text-24'}
                    placeholder={'이메일을 입력하세요'}
                    {...register('email')}
                />
            )}
            <button className={'h-48 w-440 rounded-4 font-NanumMyeongjo text-32 text-white'} onClick={onNext}>
                {step === 0 ? '시작하기 Start' : '다음으로 Next'}
            </button>
        </form>
    );
}
