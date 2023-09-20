import { AxiosRequestConfig } from "axios";
import { fetcherWithBasicAuth } from "../fetcher";
import { endpoints } from "../constants";

type LoginParams = {
  email: string;
  password: string;
};

export async function login(params: LoginParams) {
  const config: AxiosRequestConfig = {
    url: endpoints.login,
    method: "POST",
    data: params,
  };

  return fetcherWithBasicAuth(config);
}
