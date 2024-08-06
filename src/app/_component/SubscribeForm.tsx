'use client';

import { useEffect, useState } from 'react';
import { IDepartmentName } from '@/types/department';
import { getDepartmentNameList, postSubscribe } from '@/api/subscribe';
import { cls } from '@/utils/tailwind';
import { useSubscribeFormStore } from '@/stores/useSubscribeFormStore';
import { EDescription } from '@/enums/subscribe';

export default function SubscribeForm() {
    const [departmentList, setDepartmentList] = useState<IDepartmentName>({ cse: '정보컴퓨터공학부' });
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>('정보컴퓨터공학부');
    const [inputEmail, setInputEmail] = useState<string | null>('min49590@gmail.com');
    const { step, onNextStep, setDescriptionType, reset } = useSubscribeFormStore();

    useEffect(() => {
        (async () => {
            const res = await getDepartmentNameList();
            if (res.result && res.data) {
                setDepartmentList(res.data);
            }
        })();
    }, []);

    const onClickDepartment = (_department: string) => {
        setSelectedDepartment((prev) => {
            if (prev === _department) {
                return null;
            }
            return _department;
        });
        setDescriptionType(EDescription.DEFAULT);
    };

    const onInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(e.target.value);
    };

    const handleForm = async () => {
        if (step === 0) {
            onNextStep();
        } else if (step === 1) {
            if (!selectedDepartment) {
                setDescriptionType(EDescription.WARNING);
                return;
            }
            onNextStep();
        } else if (step === 2) {
            if (!inputEmail || inputEmail.length === 0) {
                setDescriptionType(EDescription.WARNING);
                return;
            }
            setDescriptionType(EDescription.BRANCH);
            onNextStep();
        } else if (step === 3) {
            // todo: postSubscribe
            setDescriptionType(EDescription.WAITING);
            const res = await postSubscribe(inputEmail!, selectedDepartment!);
            if (res.result && res.data) {
                if (res.data === 'SUCCESS') {
                    setDescriptionType(EDescription.ALERT_MAIL);
                    onNextStep();
                } else {
                    setDescriptionType(EDescription.DUPLICATE);
                }
            } else {
                setDescriptionType(EDescription.ERROR);
            }
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleReset = () => {
        reset();
        setSelectedDepartment(null);
        setInputEmail(null);
    };

    return (
        <form className={'flex w-full flex-col items-center gap-y-12'} onSubmit={onSubmit}>
            {step === 1 && (
                <DepartmentSelectBox
                    departmentList={departmentList}
                    selectedDepartment={selectedDepartment}
                    onClickDepartment={onClickDepartment}
                />
            )}
            {step === 2 && (
                <input
                    className={'h-48 w-440 rounded-4 px-12 font-NanumMyeongjo text-18 text-black'}
                    placeholder={'이메일을 입력하라.'}
                    onChange={onInputEmail}
                />
            )}
            {step === 3 && (
                <BranchSection
                    selectedDepartment={selectedDepartment}
                    inputEmail={inputEmail}
                    handleReset={handleReset}
                    handleSubscribe={handleForm}
                />
            )}
            <button
                className={cls(
                    'h-48 w-440 animate-pulse rounded-4 font-NanumMyeongjo text-24 text-white',
                    step < 3 ? '' : 'hidden',
                )}
                onClick={handleForm}
            >
                {step === 0 ? '시작하기 Start' : '다음으로 Next'}
            </button>
        </form>
    );
}

function CardButton({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={
                'flex h-360 max-h-full w-400 flex-col items-center rounded-4 border border-white p-24 text-white transition-all duration-300 hover:scale-105'
            }
        >
            <h3 className={'font-NanumMyeongjo text-24 font-bold'}>{title}</h3>
            <p className={'mt-24 text-start font-NanumMyeongjo text-18'}>&nbsp;{description}</p>
        </button>
    );
}

function DepartmentSelectBox({
    departmentList,
    selectedDepartment,
    onClickDepartment,
}: {
    departmentList: IDepartmentName;
    selectedDepartment: string | null;
    onClickDepartment: (department: string) => void;
}) {
    return (
        <div
            id="department-select-box"
            className={'scroll-hidden flex h-144 w-440 flex-col overflow-y-scroll rounded-4 bg-white text-black'}
        >
            {Object.keys(departmentList).map((key) => {
                return (
                    <button
                        key={key}
                        value={departmentList[key]}
                        onClick={() => onClickDepartment(departmentList[key])}
                        className={cls(
                            'mx-4 mt-4 w-full rounded-4 hover:bg-gray-200',
                            selectedDepartment === departmentList[key] ? 'font-bold' : '',
                        )}
                    >
                        {departmentList[key]}
                    </button>
                );
            })}
        </div>
    );
}

function BranchSection({
    selectedDepartment,
    inputEmail,
    handleReset,
    handleSubscribe,
}: {
    selectedDepartment: string | null;
    inputEmail: string | null;
    handleReset: () => void;
    handleSubscribe: () => void;
}) {
    return (
        <div className={'flex h-full w-full justify-between gap-x-24 px-48'}>
            <CardButton
                title={'구독하기 Subscribe'}
                description={'매일 특정 시간에 선택한 학과에서 소식을 가져와 구독신청한 이메일로 보내드립니다.'}
                onClick={handleSubscribe}
            />
            <div
                className={
                    'absolute bottom-0 left-0 right-0 top-102 m-auto flex animate-pulse flex-col items-center font-NanumMyeongjo text-24 font-bold'
                }
            >
                <span>{selectedDepartment}</span>
                <span>{inputEmail}</span>
            </div>
            <CardButton
                title={'취소하기 Cancle'}
                description={'모든 상태를 초기화합니다. 아무 일도 일어나지 않습니다.'}
                onClick={handleReset}
            />
        </div>
    );
}
