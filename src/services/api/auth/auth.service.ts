import {
  IResetPassword,
  ISignInBody,
  ISignUpBody,
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

  async forgotPassword(email: string) {
    const response = await axios.post("/forgot-password", { email });
    return response;
  }

  async resetPassword(token: string, body: IResetPassword) {
    const response = await axios.post(`/reset-password/${token}`, body);
    return response;
  }
}

export const authService = new AuthService();
