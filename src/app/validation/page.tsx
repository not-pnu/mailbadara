import { Suspense } from 'react';
import SuccessSubscribe from '@/app/validation/_component/SuccessSubscribe';

export default function ValidationEmailPage() {
    return (
        <Suspense>
            <SuccessSubscribe />
        </Suspense>
    );
}
