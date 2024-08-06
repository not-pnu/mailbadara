export interface IFetchy {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
    handlers?: {
        onError?: (error: any) => void;
    };
}

export interface IFetchyOptions<T = unknown> {
    headers?: Record<string, string>;
    body?: T;
    params?: Record<string, string>;
}

export interface IFetchyResponse<F = unknown> {
    result: boolean;
    message: string | null;
    data: F | undefined;
    statusCode: number;
}
