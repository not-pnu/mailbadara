import { cls } from '@/utils/tailwind';

export default function CardButton({
  title,
  description,
  disabled,
  onClick,
}: {
  title: string;
  description: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cls(
        'flex h-360 max-h-full w-400 flex-col items-center rounded-4 border border-white p-24 text-white transition-all duration-300 hover:scale-105',
        'scroll-hidden md:h-full md:w-full md:overflow-y-scroll md:transition-none md:hover:scale-100',
        'disabled:opacity-50',
      )}>
      <h3 className={'text-24 font-bold'}>{title}</h3>
      <p className={'mt-24 whitespace-pre-wrap text-start text-18'}>
        &nbsp;{description}
      </p>
    </button>
  );
}
