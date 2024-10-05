import { FC, ReactElement, useEffect, useState } from "react";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { transactionService } from "@services/api/transaction/transaction.service";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { sortBy } from "lodash";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import AdminReport from "./AdminReport";
import { FaCircle } from "react-icons/fa";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Empty from "@components/Empty";

interface IRow {
  savingPlanId: any;
  totalIncome: number;
  totalExpense: number;
  differenceAmount: number;
}

const AdminReportByMonth: FC = ({}): ReactElement => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [transactions, setTransactions] = useState<
    Required<ITransactionDocument>[]
  >([]);
  const [savingPlans, setSavingPlans] = useState<ISavingPlanDocument[]>([]);
  // sorted by SavingPlan, totalIncome, totalExpense, dfifferenceAmount
  const preProcessData = () => {
    const result: IRow[] = [];
    const sortedBySavingPlan = sortBy(transactions, "savingPlanId");
    let row: IRow = {
      savingPlanId: sortedBySavingPlan[0].savingPlanId,
      totalIncome: 0,
      totalExpense: 0,
      differenceAmount: 0,
    };

    sortedBySavingPlan.forEach((transaction) => {
      if (row.savingPlanId !== transaction.savingPlanId) {
        result.push(row);
        row = {
          savingPlanId: transaction.savingPlanId,
          totalIncome: 0,
          totalExpense: 0,
          differenceAmount: 0,
        };
      }
      if (transaction.transactionType === 1)
        row.totalIncome += transaction.amount;
      else row.totalExpense += transaction.amount;
      row.differenceAmount += transaction.amount * transaction.transactionType;
    });
    result.push(row);
    // add savingPlan not exist to result
    savingPlans.forEach((savingPlan) => {
      const found = result.find((row) => row.savingPlanId === savingPlan.id);
      if (!found) {
        result.push({
          savingPlanId: savingPlan.id,
          totalIncome: 0,
          totalExpense: 0,
          differenceAmount: 0,
        });
      }
    });

    // Change the header of savingPlanId to be the interestRate and termPeriod
    result.forEach((row) => {
      const savingPlan = savingPlans.find(
        (plan) => plan.id === row.savingPlanId
      ) as ISavingPlanDocument;
      row.savingPlanId = (
        <div className="flex items-center">
          {`${savingPlan?.interestRate}% ${savingPlan?.termPeriod} months`}
          <FaCircle className="ml-2" color={savingPlan.image} />
        </div>
      );
    });

    return result;
  };

  useEffect(() => {
    transactionService
      .getTransactionsByDate(
        selectedMonth,
        new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)
      )
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedMonth]);

  useEffect(() => {
    savingPlanService
      .getAll()
      .then((res) => {
        setSavingPlans(res.data.savingPlans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (transactions.length > 0 && savingPlans.length > 0) {
    preProcessData();
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="my-4">
          Month Report:{" "}
          {/* <a className="!text-2xl text-btn">{selectedMonth.toDateString()}</a> */}
        </h3>
        <div>
          <DatePicker
            className="border-none"
            onChange={(date) => {
              if (date) {
                setSelectedMonth(date as Date);
              }
            }}
            value={selectedMonth}
            format="MM/yyyy" // Format to display year and month only
            // view="decade" // Start view from decade, allowing year selection first
            maxDetail="year" // Limit the detail level to year, so users can't select days
          />
        </div>
      </div>
      {transactions.length > 0 && savingPlans.length > 0 ? (
        <AdminReport data={preProcessData()} />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AdminReportByMonth;
