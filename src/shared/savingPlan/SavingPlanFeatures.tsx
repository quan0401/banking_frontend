import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { formatLargeNumber } from "@utils/utils.service";
import { FC, ReactElement } from "react";
import {
  FaCartPlus,
  FaMoneyBill,
  FaTachometerAlt,
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";

interface ISavingPlanFeaturesProps {
  savingPlan: ISavingPlanDocument;
}

const SavingPlanFeatures: FC<ISavingPlanFeaturesProps> = ({
  savingPlan,
}): ReactElement => {
  return (
    <>
      <hr className="border-grey my-3" />
      <h3 className="mb-6">Features</h3>

      <div className="grid  grid-cols-2 gap-y-4 ">
        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            <FaCartPlus size={20} className="mr-1" />
            Title
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">{savingPlan.title}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            <FaCartPlus size={20} className="mr-1" />
            Category
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">{savingPlan.basicDescription}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            {" "}
            <FaMoneyBill size={20} className="mr-1" />
            From
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(
                parseFloat(`${savingPlan.minimumEachTransaction}`)
              )}{" "}
              {`${savingPlan.currency}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            {" "}
            <FaTachometerAlt size={20} className="mr-1" />
            <p className="line-clamp-1">Maximum each transaction</p>
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(
                parseFloat(`${savingPlan.maximumEachTransaction}`)
              )}{" "}
              {`${savingPlan.currency}`}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            {" "}
            <FaRegArrowAltCircleUp size={20} className="mr-1" />
            Interesrate
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(parseFloat(`${savingPlan.interestRate}`))}%
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            {" "}
            <FaRegArrowAltCircleDown size={20} className="mr-1" />
            <p className="line-clamp-1">Interesrate before due</p>
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal">
              {formatLargeNumber(
                parseFloat(`${savingPlan.interestRateBeforeDueDate}`)
              )}
              %
            </span>
          </div>
        </div>
      </div>
      <hr className="border-grey my-3" />
    </>
  );
};

export default SavingPlanFeatures;
