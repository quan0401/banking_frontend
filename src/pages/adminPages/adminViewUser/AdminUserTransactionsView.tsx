import { useTheme } from "@contexts/themeContext";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { Collapse } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import { FaAngleDown, FaAngleUp, FaMoneyBillTransfer } from "react-icons/fa6";
import HomeQuickViewTransaction from "@pages/home/HomeQuickViewTransaction";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import Empty from "@components/Empty";

interface IAdminUserTransactionsViewProps {
  savingPlans: ISavingPlanDocument[];
  transactions: ITransactionDocument[];
}

const AdminUserTransactionsView: FC<IAdminUserTransactionsViewProps> = ({
  savingPlans,
  transactions,
}): ReactElement => {
  const [active, setActive] = useState<boolean>(transactions.length <= 0);
  const { theme } = useTheme();

  return (
    <div className={`w-full cursor-pointer`}>
      <div>
        <button
          className={`flex text-4xl items-center btn btn--primary ${
            active ? "active mb-8" : ""
          }`}
          onClick={() => setActive(!active)}
        >
          <div className="flex items-center gap-2.5">
            <FaMoneyBillTransfer />
            <span className="text-lg font-bold">Transactions History</span>
          </div>
          {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
        </button>
        <Collapse in={active} timeout="auto" unmountOnExit>
          {transactions.length > 0 ? (
            <div
              className={`submenu flex  flex-col gap-3 max-h-[500px] ${
                active && "overflow-scroll"
              }`}
              style={{
                overflowX: "hidden",
              }}
            >
              {transactions.map((tran, index) => {
                const savingPlan: ISavingPlanDocument = savingPlans.find(
                  (plan) => plan.id === tran.savingPlanId
                ) as ISavingPlanDocument;
                return (
                  <div key={index}>
                    <hr
                      className={`border-grey ${
                        theme === "light" && "border-gray"
                      }`}
                    />
                    <HomeQuickViewTransaction
                      transaction={tran}
                      savingPlan={savingPlan}
                    />

                    <hr
                      className={`border-grey ${
                        theme === "light" && "border-gray"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </Collapse>
      </div>
    </div>
  );
};

export default AdminUserTransactionsView;
