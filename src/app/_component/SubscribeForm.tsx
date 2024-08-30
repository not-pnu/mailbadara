'use client';

import { useEffect, useRef, useState } from 'react';
import { IDepartmentName } from '@/types/department';
import { getDepartmentNameList, postSubscribe } from '@/api/subscribe';
import { cls } from '@/utils/tailwind';
import { useSubscribeFormStore } from '@/stores/useSubscribeFormStore';
import { EDescription } from '@/enums/subscribe';
import { isEmail } from '@/utils/regex';

export default function SubscribeForm() {
  const [departmentList, setDepartmentList] = useState<IDepartmentName>({
    cse: '정보컴퓨터공학부',
  });
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<
    string | null
  >(null);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const { step, onNextStep, setDescriptionType, reset } =
    useSubscribeFormStore();

  useEffect(() => {
    (async () => {
      const res = await getDepartmentNameList();
      if (res.result && res.data) {
        setDepartmentList(res.data);
      }
    })();
  }, []);

  const onClickDepartment = (_code: string) => {
    setSelectedDepartmentCode((prev) => {
      if (prev === _code) {
        return null;
      }
      return _code;
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
      if (!selectedDepartmentCode) {
        setDescriptionType(EDescription.WARNING);
        return;
      }
      onNextStep();
    } else if (step === 2) {
      if (!inputEmail || inputEmail.length === 0 || !isEmail(inputEmail)) {
        setDescriptionType(EDescription.WARNING);
        return;
      }
      setDescriptionType(EDescription.BRANCH);
      onNextStep();
    } else if (step === 3) {
      // todo: postSubscribe
      setDescriptionType(EDescription.WAITING);
      const res = await postSubscribe(inputEmail!, selectedDepartmentCode!);
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
    setSelectedDepartmentCode(null);
    setInputEmail(null);
  };

  return (
    <form
      className={'flex h-full flex-col items-center justify-end gap-y-12'}
      onSubmit={onSubmit}>
      {step === 1 && (
        <DepartmentSelectBox
          departmentList={departmentList}
          selectedDepartmentCode={selectedDepartmentCode}
          onClickDepartment={onClickDepartment}
        />
      )}
      {step === 2 && (
        <input
          className={
            'h-48 w-440 rounded-4 px-12 font-NanumMyeongjo text-18 text-black md:w-full'
          }
          placeholder={'이메일을 입력하라.'}
          onChange={onInputEmail}
        />
      )}
      {step === 3 && (
        <BranchSection
          selectedDepartment={departmentList[selectedDepartmentCode!] || ''}
          inputEmail={inputEmail}
          handleReset={handleReset}
          handleSubscribe={handleForm}
        />
      )}
      <button
        className={cls(
          'h-48 w-440 animate-pulse rounded-4 font-NanumMyeongjo text-24 text-white md:h-fit md:w-full',
          step < 3 ? '' : 'hidden',
        )}
        onClick={handleForm}>
        {step === 0 ? '시작하기 Start' : '다음으로 Next'}
      </button>
    </form>
  );
}

function CardButton({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cls(
        'flex h-360 max-h-full w-400 flex-col items-center rounded-4 border border-white p-24 text-white transition-all duration-300 hover:scale-105',
        'scroll-hidden md:h-full md:w-full md:overflow-y-scroll md:transition-none md:hover:scale-100',
      )}>
      <h3 className={'text-24 font-bold'}>{title}</h3>
      <p className={'mt-24 whitespace-pre-wrap text-start text-18'}>
        &nbsp;{description}
      </p>
    </button>
  );
}

function DepartmentSelectBox({
  departmentList,
  selectedDepartmentCode,
  onClickDepartment,
}: {
  departmentList: IDepartmentName;
  selectedDepartmentCode: string | null;
  onClickDepartment: (department: string) => void;
}) {
  return (
    <div
      id="department-select-box"
      className={
        'scroll-hidden flex h-144 w-440 flex-col overflow-y-scroll rounded-4 bg-white text-black md:w-full'
      }>
      {Object.keys(departmentList).map((code) => {
        return (
          <button
            key={code}
            onClick={() => onClickDepartment(code)}
            className={cls(
              'mx-4 mt-4 w-full rounded-4 hover:bg-gray-200',
              selectedDepartmentCode === code ? 'font-bold' : '',
            )}>
            {departmentList[code]}
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className={
        'flex w-full justify-between gap-x-24 md:flex-col md:gap-y-24'
      }>
      <CardButton
        title={'구독하기 Subscribe'}
        description={
          '매일 특정 시간에 선택한 학과에서 소식을 가져와 구독신청한 이메일로 보내드립니다.\n\n Every day, we will take news from the department of your choice at a specific time and send it to the email you signed up for.'
        }
        onClick={handleSubscribe}
      />
      <p
        ref={ref}
        className={cls(
          'bottom-0 left-0 right-0 top-102 m-auto flex animate-pulse flex-col items-center font-NanumMyeongjo text-24 font-bold text-white',
          'md:static',
        )}>
        <span>{selectedDepartment}</span>
        <span>{inputEmail}</span>
      </p>
      <CardButton
        title={'취소하기 Cancle'}
        description={
          '모든 상태를 초기화합니다. 아무 일도 일어나지 않습니다.\n\n Initialize all states, Nothing happens.'
        }
        onClick={handleReset}
      />
    </div>
  );
}
