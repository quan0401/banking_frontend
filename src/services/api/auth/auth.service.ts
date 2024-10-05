// import {
//   IResetPassword,
//   ISignInBody,
//   ISignUpBody,
//   IUpdateProfileBody,
// } from "@interfaces/features/auth.interface";
// import axios from "@services/axios";

// class AuthService {
//   async signUp(body: ISignUpBody) {
//     const response = await axios.post("/signup", body);
//     return response;
//   }

//   async signIn(body: ISignInBody) {
//     const response = await axios.post("/signin", body);
//     return response;
//   }

//   async updateInfo(body: IUpdateProfileBody) {
//     const response = await axios.put("/update/info", body);
//     return response;
//   }

//   async forgotPassword(email: string) {
//     const response = await axios.post("/forgot-password", { email });
//     return response;
//   }

//   async resetPassword(token: string, body: IResetPassword) {
//     const response = await axios.post(`/reset-password/${token}`, body);
//     return response;
//   }

//   async currentUser(authId: string) {
//     const response = await axios.get(`/auth/currentUser/${authId}`);
//     return response;
//   }

//   async signout() {
//     const response = await axios.post(`/signout`);
//     return response;
//   }

//   async getUsersPagination(offset = 0, limit = 10) {
//     const response = await axios.get(`/admin/auth/${offset}/${limit}`);
//     return response;
//   }

//   async getUserById(id: string) {
//     const response = await axios.get(`/admin/auth/${id}`);
//     return response;
//   }
// }

// export const authService = new AuthService();

import {
  IResetPassword,
  ISignInBody,
  ISignUpBody,
  IUpdateProfileBody,
} from "@interfaces/features/auth.interface";

class AuthService {
  private axiosInstance: any;

  constructor(axiosInstance: any) {
    this.axiosInstance = axiosInstance;
  }

  async signUp(body: ISignUpBody) {
    const response = await this.axiosInstance.post("/signup", body);
    return response;
  }

  async signIn(body: ISignInBody) {
    const response = await this.axiosInstance.post("/signin", body);
    return response;
  }

  async updateInfo(body: IUpdateProfileBody) {
    const response = await this.axiosInstance.put("/update/info", body);
    return response;
  }

  async forgotPassword(email: string) {
    const response = await this.axiosInstance.post("/forgot-password", {
      email,
    });
    return response;
  }

  async resetPassword(token: string, body: IResetPassword) {
    const response = await this.axiosInstance.post(
      `/reset-password/${token}`,
      body
    );
    return response;
  }

  async currentUser(authId: string) {
    const response = await this.axiosInstance.get(
      `/auth/currentUser/${authId}`
    );
    return response;
  }

  async signout() {
    const response = await this.axiosInstance.post(`/signout`);
    return response;
  }

  async getUsersPagination(offset = 0, limit = 10) {
    const response = await this.axiosInstance.get(
      `/admin/auth/${offset}/${limit}`
    );
    return response;
  }

  async getUserById(id: string) {
    const response = await this.axiosInstance.get(`/admin/auth/${id}`);
    return response;
  }
}

export { AuthService };
