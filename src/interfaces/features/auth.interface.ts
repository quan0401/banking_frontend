export interface IAuthDocument {
  id?: string;
  profilePublicId?: string;
  username?: string;
  email?: string;
  balance?: number;
  phone?: string;
  password?: string;
  isAdmin?: 1 | 0;
  cccd?: string;
  homeAddress?: string;
  profilePicture?: string;
  emailVerified?: number | boolean;
  emailVerificationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

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

export interface IUpdateProfileBody {
  username?: string;
  phone?: string;
  homeAddress?: string;
  profilePicture?: string;
  cccd?: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IReduxAddAuthUser {
  type?: string;
  payload: {
    authInfo?: IAuthDocument;
  };
}
