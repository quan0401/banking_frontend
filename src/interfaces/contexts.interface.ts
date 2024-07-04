import { Dispatch, SetStateAction } from "react";
import { ISavingPlanDocument } from "./features/savingPlan.interface";
import { ITransactionDocument } from "./features/transaciontion.interface";

export type ITheme = "dark" | "light";

export interface IThemeContext {
  theme: ITheme;
  toggleTheme?: (theme?: ITheme) => void;
}

export interface ISideBarContext {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface IPaymentMethods {
  momo?: boolean;
  atm?: boolean;
  visa?: boolean;
}
export interface IPaymentContext {
  amount: number;
  setAmount?: Dispatch<SetStateAction<number>>;
  savingPlan: ISavingPlanDocument;
}

export interface IHomeContext {
  savingPlans: ISavingPlanDocument[];
  transactions: ITransactionDocument[];
}
