import { IAuthDocument } from "./features/auth.interface";

export interface IReduxState {
  authUser?: IAuthDocument;
  header?: boolean;
}
