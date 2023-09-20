import axios, { AxiosRequestConfig } from "axios";
import { getCurrentUser } from "../auth";

const getJWT = async () => {
  const user = await getCurrentUser();
  return user?.accessToken;
};

export const mainInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// TODO: change headers
export const fetcherWithBasicAuth = (config: AxiosRequestConfig) => {
  return mainInstance({
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: "Basic " + process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN,
    },
  });
};

export const fetcherWithToken = async (config: AxiosRequestConfig) => {
  const token = await getJWT();
  return mainInstance({
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    ...config,
  });
};
