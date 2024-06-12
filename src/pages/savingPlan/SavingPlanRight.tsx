import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { IUserSavingDocument } from "@interfaces/userSaving.interface";
import Button from "@shared/button/Button";
import SavingPlanFeatures from "@shared/savingPlan/SavingPlanFeatures";
import dateFormat from "dateformat";
import { FC, ReactElement } from "react";
import { FaCalendar } from "react-icons/fa";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ISavingPlanRightProps {
  savingPlan: ISavingPlanDocument;
  userSaving: IUserSavingDocument | null;
}

const SavingPlanRight: FC<ISavingPlanRightProps> = ({
  savingPlan,
  userSaving,
}): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <SavingPlanFeatures savingPlan={savingPlan} />

      <h3 className="mb-6">Conditions</h3>

      <div className="grid  grid-cols-2 gap-y-4">
        <div className="flex flex-col">
          <span className="text-[#95979d] flex items-center">
            {" "}
            <FaCalendar size={20} className="mr-1" />
            Time to participate
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="font-normal line-clamp-1">
              {dateFormat(savingPlan.startDate, "dd/mm/yyyy")} until{" "}
              {savingPlan.endDate
                ? dateFormat(savingPlan.endDate, "dd/mm/yyyy")
                : "End of the plan"}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-grey my-3" />
      <div className="w-full mt-10 flex just gap-4">
        {userSaving && (
          <Button
            onClick={() =>
              navigate(`/userSaving/${savingPlan.id}`, { state: savingPlan })
            }
            className="btn btn--primary"
            label="See user's plan"
          />
        )}
        <Button
          onClick={() =>
            navigate(`/checkout/${savingPlan.id}`, { state: savingPlan })
          }
          className="btn btn--primary"
          label={!userSaving ? "Continue to checkout" : "Top up more"}
        />
      </div>
    </>
  );
};

export default SavingPlanRight;
