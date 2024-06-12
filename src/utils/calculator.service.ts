import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { round } from "lodash";

/**
 *
 * @param principal  The initial principal amount
 * @param rate The annual interest rate (decimal)
 * @param timesCompounded The number of times that interest is compounded per year
 * @param years The number of years the money is invested for
 * @returns
 */
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  timesCompounded: number,
  years: number
): number => {
  // Formula: A = P (1 + r/n)^(nt)
  const amount =
    principal * Math.pow(1 + rate / timesCompounded, timesCompounded * years);
  return amount;
};

export const calculateCompoundInterestToCurrentDate = (
  principal: number,
  annualRate: number,
  timesCompounded: number,
  startDate: string
): number => {
  const currentDate = new Date();
  const start = new Date(startDate);

  // Calculate the number of milliseconds in a year
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;

  // Calculate the difference in milliseconds
  const timeDifference = currentDate.getTime() - start.getTime();

  // Convert the difference to years (including fractional years)
  const years = timeDifference / millisecondsPerYear;

  // Calculate compound interest
  const amount =
    principal *
    Math.pow(1 + annualRate / timesCompounded, timesCompounded * years);
  return Math.round(amount);
};

export const calculateBaseOnTransactions = (
  transactions: ITransactionDocument[],
  savingPlan: ISavingPlanDocument
): number => {
  let compounds: number = 0;
  if (transactions?.length && savingPlan) {
    transactions.forEach((transaction) => {
      if (transaction.isSuccessful === 1) {
        compounds += calculateCompoundInterestToCurrentDate(
          transaction.amount as number,
          (savingPlan.interestRate as number) / 100,
          1,
          `${transaction.transactionDate}`
        );
      }
    });
  }
  return compounds;
};
