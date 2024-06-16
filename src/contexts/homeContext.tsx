import { IHomeContext } from "@interfaces/contexts.interface";
import { Context, createContext } from "react";

export const HomeContext: Context<IHomeContext> = createContext<IHomeContext>({
  transactions: [],
  savingPlans: [],
});
