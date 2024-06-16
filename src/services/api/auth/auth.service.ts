import {
  IResetPassword,
  ISignInBody,
  ISignUpBody,
  IUpdateProfileBody,
} from "@interfaces/features/auth.interface";
import axios from "@services/axios";

class AuthService {
  async signUp(body: ISignUpBody) {
    const response = await axios.post("/signup", body);
    return response;
  }

  async signIn(body: ISignInBody) {
    const response = await axios.post("/signin", body);
    return response;
  }

  async updateInfo(body: IUpdateProfileBody) {
    const response = await axios.put("/update/info", body);
    return response;
  }

  async forgotPassword(email: string) {
    const response = await axios.post("/forgot-password", { email });
    return response;
  }

  async resetPassword(token: string, body: IResetPassword) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }

  async currentUser(authId: string) {
    const response = await axios.get(`/auth/currentUser/${authId}`);
    return response;
  }

  async signout() {
    const response = await axios.post(`/signout`);
    return response;
  }
}

export const authService = new AuthService();
