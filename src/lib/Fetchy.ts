import type { IFetchy, IFetchyOptions, IFetchyResponse } from '@/types/fetchy';

/**
 * fetch api를 axios처럼 사용하고, 에러 핸들링을 하기 위한 Fetchy 클래스입니다.
 */
export class Fetchy {
    private baseUrl?: string;
    private defaultHeaders?: Record<string, string>;
    private onError?: (error: any) => void;

    constructor({ baseUrl, defaultHeaders, handlers }: IFetchy) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
        this.onError = handlers?.onError;
    }

    /**
     * fetch 요청을 보내는 메소드입니다.
     * @param method
     * @param url
     * @param options
     */
    public request<T = unknown>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        options?: IFetchyOptions,
    ): Promise<IFetchyResponse<T>> {
        return this.fetchyInstance<T>(method, url, options);
    }

    public get<T = unknown>(url: string, options?: IFetchyOptions): Promise<IFetchyResponse<T>> {
        return this.request('GET', url, options);
    }

    public post<T = unknown>(url: string, options?: IFetchyOptions): Promise<IFetchyResponse<T>> {
        return this.request('POST', url, options);
    }

    public put<T = unknown>(url: string, options?: IFetchyOptions): Promise<IFetchyResponse<T>> {
        return this.request('PUT', url, options);
    }

    public delete<T = unknown>(url: string, options?: IFetchyOptions): Promise<IFetchyResponse<T>> {
        return this.request('DELETE', url, options);
    }

    /**
     * params 객체를 stringify하고 붙인 url을 생성합니다.
     * @param url
     * @param params
     * @private
     */
    protected createUrl(url: string, params?: Record<string, string>): string {
        let inputUrl = this.baseUrl ? this.baseUrl + url : url;
        if (url.startsWith('http')) {
            inputUrl = url;
        }
        if (params) {
            inputUrl += '?' + new URLSearchParams(params).toString();
        }
        return inputUrl;
    }

    /**
     * fetch 요청을 위한 options 객체를 생성합니다.
     * @param method
     * @param options
     * @private
     */
    protected createOptions(method: string, options?: IFetchyOptions): RequestInit {
        let body: any;
        let headers = {
            ...this.defaultHeaders,
            ...options?.headers,
        };
        if (options?.headers?.['Content-Type']) {
            headers = {
                ...headers,
                'Content-Type': options.headers['Content-Type'],
            };
        }

        if (options?.body) {
            if (options.body instanceof FormData) {
                body = options.body;
                headers = {
                    ...headers,
                };
            } else if (typeof options.body === 'object') {
                body = JSON.stringify(options.body);
                headers = {
                    ...headers,
                    'Content-Type': 'application/json',
                };
            } else {
                switch (headers['Content-Type']) {
                    case 'application/json':
                        body = JSON.stringify(options.body);
                        break;
                    case 'application/x-www-form-urlencoded':
                        if (typeof options.body === 'object') {
                            body = new URLSearchParams({ ...options.body }).toString();
                        } else {
                            throw new Error('application/x-www-form-urlencoded body must be an object');
                        }
                        break;
                    case 'multipart/form-constants':
                        body = options.body;
                        break;
                    default:
                        body = options.body;
                        break;
                }
            }
        }
        return {
            method: method,
            headers,
            body,
        };
    }

    /**
     * fetch 요청을 보내고, 타입 지정된 response를 처리합니다.
     * @param method
     * @param url
     * @param options
     * @private
     */
    protected async fetchyInstance<T = unknown>(
        method: string,
        url: string,
        options?: IFetchyOptions,
    ): Promise<IFetchyResponse<T>> {
        const inputUrl = this.createUrl(url, options?.params);
        const initOptions = this.createOptions(method, options);

        // LOG

        try {
            const res = await fetch(inputUrl, initOptions);
            return await res.json().then((jsonResponse) => {
                const returnResponse = {
                    result: jsonResponse.result !== undefined ? jsonResponse.result : res.ok,
                    message: jsonResponse.message,
                    data: jsonResponse.data || jsonResponse.results || jsonResponse.type,
                    statusCode: res.status,
                };
                return returnResponse;
            });
        } catch (error: any) {
            if (this.onError) {
                this.onError(error);
            }
            throw error;
        }
    }

    addHeader(key: string, value: string) {
        if (!this.defaultHeaders) {
            this.defaultHeaders = {
                [key]: value,
            };
        } else {
            if (key in this.defaultHeaders) {
                return;
            }

            this.defaultHeaders[key] = value;
        }
    }
}
