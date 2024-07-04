import { FC, ReactElement, useEffect, useState } from "react";
import AdminReport from "./AdminReport";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import Empty from "@components/Empty";
import DatePicker from "react-date-picker";
import { transactionService } from "@services/api/transaction/transaction.service";

interface IData {
  date: string;
  countOpenTransactions: number;
  countClosedTransactions: number;
  differenceAmount: number;
}

const AdminOpenPlanTable: FC = (): ReactElement => {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 100))
  );
  const [transactions, setTransactions] = useState<
    Required<ITransactionDocument>[]
  >([]);

  const processData = (transactions: Required<ITransactionDocument>[]) => {
    const result: IData[] = [];

    let selectedDate = new Date(transactions[0].transactionDate).toDateString();
    let row: IData = {
      date: selectedDate,
      countClosedTransactions: 0,
      countOpenTransactions: 0,
      differenceAmount: 0,
    } as IData;

    transactions.forEach((transaction) => {
      const transactionDateStr = new Date(
        transaction.transactionDate
      ).toDateString();
      if (selectedDate !== transactionDateStr) {
        result.push(row);
        selectedDate = transactionDateStr; // Update selectedDate for the next iteration
        row = {
          countClosedTransactions: 0,
          countOpenTransactions: 0,
          differenceAmount: 0,
          date: transactionDateStr,
        };
      }
      if (transaction.transactionType === 1) row.countOpenTransactions += 1;
      else row.countClosedTransactions += 1;
      row.differenceAmount += transaction.amount * transaction.transactionType;
    });

    // Push the last row since it won't be added inside the loop
    result.push(row);

    return result;
  };

  useEffect(() => {
    transactionService
      .getTransactionsByDate(startDate, endDate)
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [startDate, endDate]);

  return (
    <>
      <div className="flex items-center">
        <h3 className="my-3 mr-3">Openned and Closed by date</h3>
        <DatePicker
          className="border-none"
          onChange={(date) => {
            if (date) {
              setStartDate(date as Date);
            }
          }}
          value={startDate}
        />
        <h4 className="mx-2">to</h4>
        <DatePicker
          className="border-none"
          onChange={(date) => {
            if (date) {
              setEndDate(date as Date);
            }
          }}
          value={endDate}
        />
      </div>
      {transactions.length > 0 ? (
        <AdminReport data={processData(transactions)} />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default AdminOpenPlanTable;
