import { LoginResponseBody } from '@/lib/types';
import { AxiosRequestConfig } from 'axios';
import { fetcherWithBasicAuth } from '../client/client-fetcher';
import { endpoints } from '../constants';

type LoginParams = {
  email: string;
  password: string;
};

export async function login(params: LoginParams) {
  const config: AxiosRequestConfig = {
    url: endpoints.login,
    method: 'POST',
    data: params
  };

  return fetcherWithBasicAuth<LoginResponseBody>(config);
}
