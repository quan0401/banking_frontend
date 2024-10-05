import { Collapse } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import { FaAngleUp, FaAngleDown, FaCashRegister } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { useTheme } from "@contexts/themeContext";
import QuickViewSubPlan from "./QuickViewSubPlan";
import { Link } from "react-router-dom";

interface ISubPlanView {
  transactions: ITransactionDocument[];
  savingPlan: ISavingPlanDocument;
}

const SubPlanView: FC<ISubPlanView> = ({
  transactions,
  savingPlan,
}): ReactElement => {
  const { theme } = useTheme();
  const [active, setActive] = useState(true);
  return (
    <div className="mt-10 lg:mt-0 order-last lg:order-none w-full cursor-pointer">
      <div className="flex gap-3">
        <button
          className={`flex text-4xl items-center btn btn--primary !px-4 ${
            active ? "active mb-8" : ""
          }`}
          onClick={() => setActive(!active)}
        >
          <div className="flex items-center gap-2.5">
            {/* <i className={`icon icon-${}`} /> */}
            <FaCashRegister className="hidden lg:inline" />
            <span className="text-lg font-bold">All sub plans</span>
          </div>
          <span className="">
            {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
          </span>
        </button>
        <button
          className={`flex text-4xl items-center btn btn--primary ${
            active ? "active mb-8" : ""
          }`}
        >
          <Link to={`/checkout/${savingPlan.id}`}>
            <div className="flex items-center gap-2.5">
              {/* <i className={`icon icon-${}`} /> */}
              <FaMoneyBillTransfer size={20} className="hidden lg:inline" />
              <span className="text-lg font-bold">Top Up More</span>
            </div>
          </Link>
        </button>
      </div>

      <Collapse in={active} timeout="auto" unmountOnExit>
        <div className="submenu flex  flex-col gap-3">
          {transactions.map((tran, index) => {
            return (
              <div key={index}>
                <hr
                  className={`border-grey ${
                    theme === "light" && "border-gray"
                  }`}
                />
                <QuickViewSubPlan transaction={tran} savingPlan={savingPlan} />

                <hr
                  className={`border-grey ${
                    theme === "light" && "border-gray"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default SubPlanView;
