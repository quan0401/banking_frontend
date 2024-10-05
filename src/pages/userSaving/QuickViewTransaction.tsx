import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { TimeAgo } from "@utils/timeago.utils";
import { formatLargeNumber } from "@utils/utils.service";
import { FC, ReactElement, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

interface IQuickViewTransactionProps {
  transaction: ITransactionDocument;
  savingPlan: ISavingPlanDocument;
}

const QuickViewTransaction: FC<IQuickViewTransactionProps> = ({
  transaction,
  savingPlan,
}): ReactElement => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className="flex justify-between px-2 py-3 rounded-lg hover:opacity-80"
      >
        <button className="flex items-center">
          {toggleDropdown ? <FaAngleUp /> : <FaAngleDown />}
          <div className="ml-4 flex flex-col">
            <p className="font-bold text-lg flex items-center justify-between">
              {transaction.transactionType === 1 ? "Top Up" : "Withdraw"}{" "}
              <FaCirclePlus className="text-green" />
            </p>
            <p className="line-clamp-1 text-gray">
              {TimeAgo.dayWithTime(`${transaction.transactionDate}`)}
            </p>
          </div>
        </button>

        <div className="flex items-center">
          <div>
            <p className="font-bold text-lg flex items-center justify-end">
              <span>{transaction.transactionType === 1 ? `+` : "-"}</span>
              <span>{formatLargeNumber(transaction.amount as number)}</span>
            </p>
            <p
              className={`line-clamp-1 text-gray font-semibold text-end ${
                transaction.isSuccessful === 1 ? "text-green" : "text-rose-400"
              }`}
            >
              {transaction.isSuccessful === 1
                ? "Successful"
                : "Pending or Failed"}
            </p>
          </div>
        </div>
      </div>

      <div>
        {toggleDropdown && (
          <div className="p-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">ID</p>
              <p className="font-semibold line-clamp-1">{transaction.id}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Date</p>
              <p className="font-semibold line-clamp-1">
                {TimeAgo.dayWithTime(`${transaction.transactionDate}`)}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Plan title</p>
              <p className="font-semibold line-clamp-1">{savingPlan.title}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">
                Plan interest rate
              </p>
              <p className="font-semibold line-clamp-1">
                {savingPlan.interestRate} %
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">
                Transaction Type
              </p>
              <p className="font-semibold line-clamp-1">
                {transaction.bankAccountId}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickViewTransaction;
