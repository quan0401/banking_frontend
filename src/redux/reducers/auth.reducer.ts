import {
  IAuthDocument,
  IReduxAddAuthUser,
} from "@interfaces/features/auth.interface";
import { createSlice, Slice } from "@reduxjs/toolkit";

const initiValue: IAuthDocument = {
  id: undefined,
  profilePublicId: undefined,
  username: undefined,
  email: undefined,
  balance: undefined,
  phone: undefined,
  password: undefined,
  isAdmin: undefined,
  cccd: undefined,
  homeAddress: undefined,
  profilePicture: undefined,
  emailVerified: undefined,
  emailVerificationToken: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  passwordResetToken: undefined,
  passwordResetExpires: undefined,
};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState: initiValue,
  reducers: {
    addAuthUser: (
      state: IAuthDocument,
      action: IReduxAddAuthUser
    ): IAuthDocument => {
      const { authInfo } = action.payload;
      state = { ...authInfo } as unknown as IAuthDocument;
      return state;
    },
    clearAuthUser: (): IAuthDocument => {
      return initiValue;
    },
  },
});

export const { addAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
