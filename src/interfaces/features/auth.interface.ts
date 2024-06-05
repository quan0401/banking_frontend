export interface ISignInBody {
  email: string;
  password: string;
}

export interface ISignUpBody {
  username: string;
  password: string;
  email: string;
  phone: string;
  cccd: string;
  homeAddress: string;
  profilePicture: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}
