import {
   useMutation,
   UseMutationOptions,
   useQuery,
   useQueryClient,
   type UseQueryOptions
} from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { APIResponse, FetchQueryParams } from '../../types';

export const getJWT = async () => {
   const session = await getSession();
   return session?.accessToken;
};

const mainInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL
});

const mainFetcher = async <T>(config: AxiosRequestConfig) => mainInstance<APIResponse<T>>(config);

export const fetcherWithBasicAuth = async <T>(config: AxiosRequestConfig) => {
   return mainFetcher<T>({
      ...config,
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Basic ' + process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN,
         ...config.headers
      }
   });
};

export const fetcherWithToken = async <T>(config: AxiosRequestConfig) => {
   const token = await getJWT();
   return mainFetcher<T>({
      ...config,
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
         ...config.headers
      }
   });
};

function useApi<
   TQueryKey extends [string, Record<string, unknown>?],
   TQueryFnData,
   TError,
   TData = TQueryFnData
>(
   queryKey: TQueryKey,
   // eslint-disable-next-line no-unused-vars
   fetcher: (params: TQueryKey[1]) => Promise<TQueryFnData>,
   options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey,
      async queryFn() {
         return fetcher(queryKey[1]);
      },
      ...options
   });
}

export function useAppFetch<TData>(
   { endpoint, queryKey, type }: FetchQueryParams,
   options?: Omit<
      UseQueryOptions<APIResponse<TData>, Error, TData, [string, Record<string, unknown>?]>,
      'queryFn' | 'queryKey'
   >
) {
   return useApi(
      [queryKey, { url: endpoint }],
      async (params) => {
         if (!params) throw new Error('params is undefined');

         let response;

         if (type === 'basic-auth') {
            response = await fetcherWithBasicAuth<TData>(params);
         } else {
            response = await fetcherWithToken<TData>(params);
         }

         if (response === null) {
            throw new Error('Failed to fetch data');
         }

         return response.data;
      },
      options
   );
}

function useMainMutation<TData, TError, TVariables>(
   // eslint-disable-next-line no-unused-vars
   mutationFn: (variables: TVariables) => Promise<TData>,
   options?: Omit<
      UseMutationOptions<TData, TError, TVariables, unknown>,
      'mutationFn' | 'onSuccess'
   >
) {
   const queryCache = useQueryClient();

   return useMutation<TData, TError, TVariables, unknown>({
      mutationFn,
      ...options,
      onSuccess: () => {
         queryCache.invalidateQueries();
      }
   });
}

export function useAppMutation<TData, TError, TVariables>(
   { endpoint, type, headers }: FetchQueryParams,
   options?: Omit<
      UseMutationOptions<APIResponse<TData>, TError, TVariables, unknown>,
      'mutationFn' | 'onSuccess'
   >
) {
   return useMainMutation(async (variables) => {
      let response;

      const config = {
         url: endpoint,
         method: 'POST',
         data: variables,
         headers
      };

      if (type === 'basic-auth') {
         response = await fetcherWithBasicAuth<TData>(config);
      } else {
         response = await fetcherWithToken<TData>(config);
      }

      if (response === null) {
         throw new Error('Failed to fetch data');
      }

      return response.data;
   }, options);
}
