import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { formatLargeNumber } from "@utils/utils.service";
import React, { FC, ReactElement } from "react";
import dateFormat from "dateformat";

interface ISavingPlanLeftProps {
  savingPlan: ISavingPlanDocument;
}

const SavingPlanLeft: FC<ISavingPlanLeftProps> = ({
  savingPlan,
}): ReactElement => {
  return (
    <div>
      <div className="relative flex cursor-pointer">
        <img
          src={savingPlan.image}
          alt="SavingPlan Image"
          className="max-h-[480px] min-w-[400px] rounded-lg h-auto w-auto object-cover transition-all duration-500 hover:scale-105"
          // effect="blur"
        />
      </div>
      <div>
        <>
          <div className="font-semibold text-lg mt-10 pb-6">
            About This SavingPlan
          </div>
          <div className="pb-6">
            {/* <HtmlParser input={savingPlan.description} /> */}
            {savingPlan.description}
          </div>

          {/* <>
<hr className="border-grey my-3" />
          <h3 className="mb-6">Features</h3>

          <div className="grid  grid-cols-2 gap-y-4">
            <div className="flex flex-col">
              <span className="text-[#95979d]">Category</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-normal">
                  {savingPlan.basicDescription}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[#95979d]">From</span>
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
              <span className="text-[#95979d]">Category</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-normal">
                  {savingPlan.basicDescription}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[#95979d]">Maximum each transaction</span>
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
              <span className="text-[#95979d]">Interesrate</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-normal">
                  {formatLargeNumber(parseFloat(`${savingPlan.interestRate}`))}%
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[#95979d]">Interesrate before due</span>
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

          <hr className="border-grey my-3" />
          <h3 className="mb-6">Conditions</h3>

          <div className="grid  grid-cols-2 gap-y-4">
            <div className="flex flex-col">
              <span className="text-[#95979d]">Time to participate</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-normal">
                  {dateFormat(savingPlan.startDate, "dd/mm/yyyy")} until{" "}
                  {savingPlan.endDate
                    ? dateFormat(savingPlan.endDate, "dd/mm/yyyy")
                    : "End of the plan"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-grey my-3" />
</> */}
        </>
      </div>
    </div>
  );
};

export default SavingPlanLeft;
