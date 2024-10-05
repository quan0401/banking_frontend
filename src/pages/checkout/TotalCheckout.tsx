import { PaymentContext } from "@contexts/paymentContext";
import { formatLargeNumber } from "@utils/utils.service";
import { FC, ReactElement, useContext } from "react";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const TotalCheckout: FC = (): ReactElement => {
  const { savingPlan, amount } = useContext(PaymentContext);
  return (
    <>
      <hr className="border-grey my-3" />
      {/* <h3 className="mb-6">Features</h3> */}

      <div className="grid  grid-cols-2 gap-y-4 ">
        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            <FaCartPlus size={20} className="mr-1" />
            Service Fee
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">0 {savingPlan.currency}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            <FaDollarSign size={20} className="mr-1" />
            Amount
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(amount)} {savingPlan.currency}
            </span>
          </div>
        </div>
      </div>
      <hr className="border-grey my-3" />

      <div className="grid  grid-cols-2 gap-y-4 my-3">
        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            <FaMoneyBillTransfer size={20} className="mr-1" />
            Total
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(amount)} {savingPlan.currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCheckout;
