import { getCurrentUser } from '@/lib/auth';
import { APIResponse } from '@/lib/types';
import { getError } from '@/utils/api-error';
import { redirect } from 'next/navigation';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

type TFetcher = {
   url: string;
   method?: HttpMethods;
   data?: unknown;
   headers?: HeadersInit;
   cache?: RequestCache;
   tags?: string[];
};

const isObject = (value: unknown): value is Record<string, unknown> => {
   return typeof value === 'object' && value !== null;
};

function fetcherWithBasicAuth({ url, method = 'GET', data, headers, cache, tags }: TFetcher) {
   const customHeaders = new Headers(headers);
   customHeaders.append('Authorization', `Basic ${process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN}`);
   return fetch(url, {
      method,
      body: isObject(data) ? JSON.stringify(data) : undefined,
      headers: customHeaders,
      cache,
      ...(tags && { next: { tags } })
   });
}

async function fetchWithBearerToken({ url, method = 'GET', data, headers, cache, tags }: TFetcher) {
   const session = await getCurrentUser();

   if (!session?.accessToken) redirect('/auth/login');

   const customHeaders = new Headers(headers);
   customHeaders.append('Authorization', `Bearer ${session?.accessToken}`);
   return fetch(url, {
      method,
      body: isObject(data) ? JSON.stringify(data) : undefined,
      headers: customHeaders,
      cache,
      ...(tags && { next: { tags } })
   });
}

export async function appServerFetch<T, F = undefined>({
   headers,
   endpoint,
   payload,
   method = 'GET',
   cache,
   tags,
   type
}: {
   cache?: RequestCache;
   headers?: HeadersInit;
   tags?: string[];
   payload?: F;
   method?: HttpMethods;
   endpoint: string;
   type: 'basic-auth' | 'token';
}): Promise<{ status: number; data: APIResponse<T> } | never> {
   try {
      let result: Response;

      if (type === 'basic-auth') {
         result = await fetcherWithBasicAuth({
            url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
            method,
            data: payload,
            headers,
            cache,
            tags
         });
      } else {
         result = await fetchWithBearerToken({
            url: `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
            method,
            data: payload,
            headers,
            cache,
            tags
         });
      }

      if (!result.ok) throw new Error('Failed to fetch data');

      return { status: result.status, data: await result.json() };
   } catch (error: any) {
      return { status: 500, data: { success: false, message: getError(error) } };
   }
}
