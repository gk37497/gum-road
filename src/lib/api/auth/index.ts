import { LoginResponseBody, OtpResponse } from '@/lib/types';
import { AxiosRequestConfig } from 'axios';
import { fetcherWithBasicAuth } from '../client/client-fetcher';
import { endpoints } from '../constants';

export type LoginParams = {
   email: string;
   password: string;
};

export interface GoogleLoginParams {
   email: string;
   name: string;
   profileImage: string;
}

export async function login(params: LoginParams) {
   const config: AxiosRequestConfig = {
      url: endpoints.login,
      method: 'POST',
      data: params
   };

   return fetcherWithBasicAuth<LoginResponseBody>(config);
}

export async function googleLogin(params: GoogleLoginParams) {
   const config: AxiosRequestConfig = {
      url: endpoints.googleLogin,
      method: 'POST',
      data: params
   };

   return fetcherWithBasicAuth<LoginResponseBody>(config);
}

export async function sendOTP(email: string) {
   const config: AxiosRequestConfig = {
      url: endpoints.sendOTP,
      method: 'POST',
      data: { email }
   };

   return fetcherWithBasicAuth<OtpResponse>(config);
}

export async function register(params: LoginParams & { otpCode: string; token: string }) {
   const config: AxiosRequestConfig = {
      url: endpoints.register,
      method: 'POST',
      data: params
   };

   return fetcherWithBasicAuth<LoginResponseBody>(config);
}

export async function forgotPassword(email: string) {
   const config: AxiosRequestConfig = {
      url: endpoints.forgotPassword,
      method: 'POST',
      data: { email }
   };

   return fetcherWithBasicAuth(config);
}

export async function resetPassword(params: { uid: string; newPassword: string }) {
   const config: AxiosRequestConfig = {
      url: endpoints.resetPassword,
      method: 'POST',
      data: params
   };

   return fetcherWithBasicAuth<LoginResponseBody>(config);
}

export async function refreshToken(token: string) {
   const config: AxiosRequestConfig = {
      url: endpoints.refreshToken,
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`
      }
   };

   return fetcherWithBasicAuth<{ accessToken: string; expires_in: number }>(config);
}

export async function checkEmailAndToken(email: string, token: string) {
   const config: AxiosRequestConfig = {
      url: endpoints.checkEmail + `/${token}` + `/${email}`
   };

   return fetcherWithBasicAuth<boolean>(config);
}
