import { Dispatch, SetStateAction } from "react";
import { ISavingPlanDocument } from "./features/savingPlan.interface";

export type ITheme = "dark" | "light";

export interface IThemeContext {
  theme: string;
  toggleTheme?: () => void;
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
