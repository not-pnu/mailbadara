import { useEffect, useRef } from 'react';
import CardButton from '@/app/_component/CardButton';
import { cls } from '@/utils/tailwind';

export default function BranchSection({
  selectedDepartment,
  inputEmail,
  isLoading,
  handleReset,
  handleSubscribe,
}: {
  selectedDepartment: string | null;
  inputEmail: string | null;
  isLoading: boolean;
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
        disabled={isLoading}
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
        disabled={isLoading}
        title={'취소하기 Cancle'}
        description={
          '모든 상태를 초기화합니다. 아무 일도 일어나지 않습니다.\n\n Initialize all states, Nothing happens.'
        }
        onClick={handleReset}
      />
    </div>
  );
}
