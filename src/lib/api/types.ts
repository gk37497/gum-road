export interface APIResponse<T> {
    success: boolean;
    message: string;
    body?: T;
}

export interface LoginResponseBody {
    token: string;
}