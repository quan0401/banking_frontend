import { IPaymentContext } from "@interfaces/contexts.interface";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { Context, createContext } from "react";

export const PaymentContext: Context<IPaymentContext> =
  createContext<IPaymentContext>({
    amount: 0,
    savingPlan: {} as ISavingPlanDocument,
  });
