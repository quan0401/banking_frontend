import { FC, ReactElement } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatLargeNumber } from "@utils/utils.service";
import { ISavingPlanCardItems } from "@interfaces/features/savingPlan.interface";
import SavingPlanCard from "@components/SavingPlanCard";

const SavingPlanCardDisplayItem: FC<ISavingPlanCardItems> = ({
  savingPlan,
  showEditIcon,
}): ReactElement => {
  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2 bg-contain bg-no-repeat">
        {/* <Link to={`/savingPlan-view/${savingPlan.id}`}>
          <img
            src={savingPlan.image}
            alt="SavingPlan cover image"
            className="fixed-dimensions rounded-lg object-cover"
          />
        </Link> */}
        <Link to={`/savingPlan-view/${savingPlan.id}`}>
          <SavingPlanCard savingPlan={savingPlan} />
        </Link>

        <div className="flex items-center gap-2 relative">
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              <Link to={`/savingPlan-view/${savingPlan.id}`}>
                <strong className="text-sm font-medium md:text-base">
                  {savingPlan.title}
                </strong>
              </Link>
            </span>
            {showEditIcon && (
              <FaPencilAlt className="mr-2 flex self-center" size={15} />
            )}
          </div>
        </div>
        <div>
          <Link to={`/savingPlan-view/${savingPlan.id}`}>
            <p className="line-clamp-2 text-sm hover:underline md:text-base">
              {savingPlan.basicDescription}
            </p>
          </Link>
        </div>

        <div>
          <strong className="text-sm font-bold md:text-base">
            From{" "}
            {formatLargeNumber(
              parseFloat(`${savingPlan.minimumEachTransaction}`)
            )}{" "}
            {savingPlan.currency}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SavingPlanCardDisplayItem;
