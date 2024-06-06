import { FC, ReactElement, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { formatLargeNumber, shortenLargeNumbers } from "@utils/utils.service";
import { ISavingPlanCardItems } from "@interfaces/features/savingPlan.interface";

const SavingPlanCardDisplayItem: FC<ISavingPlanCardItems> = ({
  savingPlan,
  linkTarget,
  showEditIcon,
}): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="rounded w-72">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/savingPlan-view/${savingPlan.id}`}>
          <img
            src={savingPlan.image}
            alt="SavingPlan cover image"
            className="fixed-dimensions rounded-lg object-cover"
            // className={` aspect-square object-center`}
          />
        </Link>
        <div className="flex items-center gap-2 relative">
          <img
            src={savingPlan.image}
            alt="Profile image"
            className="h-7 w-8 rounded-full object-cover"
          />
          {/* {seller.current === savingPlan.email && (
            <span className="bottom-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          )} */}
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
        {/* <div className="flex items-center gap-1 text-yellow-400">
          {parseInt(`${savingPlan.ratingsCount}`) > 0 ? (
            <FaStar />
          ) : (
            <FaRegStar />
          )}
          <strong className="text-sm font-bold">
            (
            {rating(
              parseInt(`${savingPlan.ratingSum}`) /
                parseInt(`${savingPlan.ratingsCount}`)
            )}
            )
          </strong>
        </div> */}
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
