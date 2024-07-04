// import libAxios, { AxiosInstance, AxiosResponse } from "axios";
// import { NavigateFunction } from "react-router-dom";
// import { authService } from "./api/auth/auth.service";
// import { logout } from "@redux/reducers/logout.reducer";
// import { showErrorToast } from "@utils/utils.service";

// export let BASE_ENDPOINT = "";

// export const APP_ENVIRONMENT = "local";
// if (APP_ENVIRONMENT === "local") {
//   BASE_ENDPOINT = "http://localhost:6969";
// }

// const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

// const axios: AxiosInstance = libAxios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json", Accept: "application/json" },
//   withCredentials: true,
// });

// // authServiceActions.ts
// let navigateFunction: NavigateFunction;
// let dispatchFunction: any;

// export const setNavigateFunction = (navigate: any) => {
//   navigateFunction = navigate;
// };

// export const setDispatchFunction = (dispatch: any) => {
//   dispatchFunction = dispatch;
// };

// export const onLogout = async () => {
//   await authService.signout();
//   if (dispatchFunction) {
//     dispatchFunction(logout(true));
//   }
//   if (navigateFunction) {
//     navigateFunction("/login");
//   }
// };

// axios.interceptors.response.use(
//   (res: AxiosResponse): AxiosResponse => {
//     return res;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       onLogout(); // This will now work
//       showErrorToast("Session expired, please login again");
//     }

//     return error;
//   }
// );

// export default axios;

import libAxios, { AxiosInstance, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { logout } from "@redux/reducers/logout.reducer";
import { showErrorToast } from "@utils/utils.service";
import { AuthService } from "./api/auth/auth.service";

export let BASE_ENDPOINT = "";

export const APP_ENVIRONMENT = "local";
if (APP_ENVIRONMENT === "local") {
  // BASE_ENDPOINT = "http://localhost:6969";
  BASE_ENDPOINT = "http://10.0.38.239:6969";
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

const axios: AxiosInstance = libAxios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

// authServiceActions.ts
let navigateFunction: NavigateFunction;
let dispatchFunction: any;

export const setNavigateFunction = (navigate: any) => {
  navigateFunction = navigate;
};

export const setDispatchFunction = (dispatch: any) => {
  dispatchFunction = dispatch;
};

export const onLogout = async () => {
  await authService.signout();
  if (dispatchFunction) {
    dispatchFunction(logout(true));
  }
  if (navigateFunction) {
    navigateFunction("/login");
  }
};

axios.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      onLogout();
      showErrorToast("Session expired, please login again");
    }

    return error;
  }
);

const authService = new AuthService(axios);

export { authService };
export default axios;
