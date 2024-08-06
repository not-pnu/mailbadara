import SubscribeForm from '@/app/_component/SubscribeForm';
import DescriptionSection from '@/app/_component/DescriptionSection';

export default function Home() {
    return (
        <main className={'flex h-full w-full flex-col items-center bg-black text-center text-white'}>
            <div className={'relative h-full max-h-1024 w-full max-w-1440'}>
                <h1 className={'text-295 font-bold leading-295'}>메일 받아라</h1>
                <DescriptionSection />
                <div className={'absolute bottom-24 left-0 right-0 mx-auto'}>
                    <SubscribeForm />
                </div>
            </div>
        </main>
    );
}
