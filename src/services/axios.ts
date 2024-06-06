import libAxios, { AxiosInstance, AxiosResponse } from "axios";

export let BASE_ENDPOINT = "";

export const APP_ENVIRONMENT = "local";
if (APP_ENVIRONMENT === "local") {
  BASE_ENDPOINT = "http://localhost:6969";
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

const axios: AxiosInstance = libAxios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

axios.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  return res;
});

export default axios;
