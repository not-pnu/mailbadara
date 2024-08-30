'use client';

import { useEffect, useState } from 'react';
import { IDepartmentName } from '@/types/department';
import { getDepartmentNameList, postSubscribe } from '@/api/subscribe';
import { cls } from '@/utils/tailwind';
import { useSubscribeFormStore } from '@/stores/useSubscribeFormStore';
import { EDescription } from '@/enums/subscribe';
import { isEmail } from '@/utils/regex';
import BranchSection from '@/app/_section/BranchSection';
import { MoonLoader } from 'react-spinners';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    if (step === 0) {
      onNextStep();
    } else if (step === 1) {
      if (!selectedDepartmentCode) {
        setDescriptionType(EDescription.WARNING);
        setIsLoading(false);
        return;
      }
      onNextStep();
    } else if (step === 2) {
      if (!inputEmail || inputEmail.length === 0 || !isEmail(inputEmail)) {
        setDescriptionType(EDescription.WARNING);
        setIsLoading(false);
        return;
      }
      setDescriptionType(EDescription.BRANCH);
      onNextStep();
    } else if (step === 3) {
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
    setIsLoading(false);
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
          isLoading={isLoading}
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
      {isLoading && (
        <div
          className={
            'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50'
          }>
          <MoonLoader color={'#ffffff'} loading={isLoading} size={50} />
        </div>
      )}
    </form>
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
