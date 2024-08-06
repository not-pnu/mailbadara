import { Fetchy } from '@/lib/Fetchy';

/** ClientFetchy.ts
 *
 * Nextjs 클라이언트에서 api를 호출하기 위한, fetch 인스턴스를 생성합니다.
 * - axios처럼 body, headers, params를 json object로 전달받을 수 있습니다.
 * - fetch의 response를 json으로 변환하여 반환합니다.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ClientFetchy extends Fetchy {
    constructor() {
        super({
            baseUrl: BASE_URL,
            handlers: {
                onError: (error: any) => {
                    alert(error);
                    console.error('[Error] client-fetchy', error);
                    return;
                },
            },
        });
    }
}

export const clientFetchy = new ClientFetchy();
