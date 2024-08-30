import SubscribeForm from '@/app/_component/SubscribeForm';
import DescriptionSection from '@/app/_section/DescriptionSection';

export default function Home() {
  return (
    <>
      <DescriptionSection />
      <div className={'absolute bottom-0 left-0 right-0 m-24 h-full md:static'}>
        <SubscribeForm />
      </div>
    </>
  );
}
