import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import { FC, ReactElement } from "react";
import { IUserSavingDocument } from "@interfaces/userSaving.interface";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { formatLargeNumber } from "@utils/utils.service";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { calculateBaseOnTransactions } from "@utils/calculator.service";
import SavingPlanCard from "@components/SavingPlanCard";

interface ISellerListItemProps {
  userSaving: IUserSavingDocument;
  index: number;
  savingPlan: ISavingPlanDocument;
  transactions: ITransactionDocument[];
}

const UserSavingItem: FC<ISellerListItemProps> = ({
  index,
  userSaving,
  savingPlan,
  transactions,
}): ReactElement => {
  const compounds = calculateBaseOnTransactions(transactions, savingPlan);

  return (
    <Spring
      className="card flex flex-col gap-5 md:gap-[26px] xl:flex-row xl:justify-between font-bold mb-2"
      index={index}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_,minmax(0,240px)] lg:gap-[26px]">
        <div className="flex flex-col flex-1 gap-5 md:flex-row md:gap-[26px]">
          <div className="flex flex-col shrink-0 gap-5">
            <SavingPlanCard savingPlan={savingPlan} />
          </div>
          <div>
            <h3 className="truncate max-w-[220px] xs:max-w-[260px] md:max-w-full xl:max-w-[218px] my-3">
              {savingPlan.title}
            </h3>
            {/* <a className="text-btn my-3" href={""}>
              www.website.com
            </a> */}
            <div className="flex flex-col items-start gap-2.5">
              <p className="max-w-[220px]">{savingPlan.basicDescription}</p>
              <p className="transition text-accent">
                {savingPlan.interestRate} %
              </p>

              <p className="transition">
                Currency:{" "}
                <span className="text-accent">{savingPlan.currency}</span>
              </p>

              {userSaving?.totalAmount && (
                <>
                  <div className="transition text-accent">
                    Before compounds:{" "}
                    <span className="text-accent">
                      {formatLargeNumber(userSaving.totalAmount)}{" "}
                    </span>
                  </div>
                  <div className="transition text-accent">
                    Profit:{" "}
                    <span className="text-accent">
                      {formatLargeNumber(compounds - userSaving.totalAmount)}{" "}
                    </span>
                  </div>
                </>
              )}

              <div className="transition text-accent">
                Total:{" "}
                <span className="text-accent">
                  {formatLargeNumber(compounds)}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center lg:block ">
          <NavLink
            className="btn btn--primary"
            to={`/userSaving/${savingPlan?.id}`}
          >
            View details
          </NavLink>
          <NavLink
            className="btn btn--primary lg:mt-10 !bg-blue-400 !border-0 hover:!bg-blue-500"
            to={`/checkout/${savingPlan?.id}`}
          >
            Top up more
          </NavLink>
        </div>
      </div>
    </Spring>
  );
};

export default UserSavingItem;
