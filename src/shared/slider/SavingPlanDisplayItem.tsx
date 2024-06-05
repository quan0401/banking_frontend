import { find } from "lodash";
import { FC, ReactElement, useEffect, useRef } from "react";
import { FaPencilAlt, FaRegStar, FaStar } from "react-icons/fa";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  lowerCase,
  rating,
  replaceAmpersandAndDashWithSpace,
  replaceSpacesWithDash,
} from "@shared/utils/utils.service";
import {
  ISavingPlanCardItems,
  ISavingPlanDocument,
} from "@interfaces/features/savingPlan.interface";

const SavingPlanCardDisplayItem: FC<ISavingPlanCardItems> = ({
  savingPlan,
  linkTarget,
  showEditIcon,
}): ReactElement => {
  const sellerEmail = useRef<string>("");
  // const title: string = replaceSpacesWithDash(savingPlan.title);
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="rounded w-72">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={""}>
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
              {linkTarget ? (
                <Link to={""}>
                  <strong className="text-sm font-medium md:text-base">
                    {savingPlan.title}
                  </strong>
                </Link>
              ) : (
                <strong className="text-sm font-medium md:text-base">
                  {savingPlan.title}
                </strong>
              )}
            </span>
            {showEditIcon && (
              <FaPencilAlt className="mr-2 flex self-center" size={15} />
            )}
          </div>
        </div>
        <div>
          <Link to={""}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">
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
            From {savingPlan.minimumEachTransaction} {savingPlan.currency}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SavingPlanCardDisplayItem;
