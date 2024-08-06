import SubscribeForm from '@/app/_component/SubscribeForm';

export default function Home() {
    return (
        <main className={'flex h-full w-full flex-col items-center bg-black text-center text-white'}>
            <h1 className={'text-295 font-bold leading-295'}>메일 받아라</h1>
            <p className={'mt-12 font-NanumMyeongjo text-24'}>
                학과를 고르고
                <br />
                이메일을 입력하라
            </p>
            <p className={'mt-48 font-NanumMyeongjo text-24'}>
                그리하면
                <br />
                정보를 손에 넣을 수 있을 것이다
            </p>
            <div className={'absolute bottom-24 left-0 right-0 mx-auto'}>
                <SubscribeForm />
            </div>
        </main>
    );
}
