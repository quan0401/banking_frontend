import { FC } from "react";
import { Link } from "react-router-dom";

interface IHomeProps {
  title: string;
  subTitle: string;
  category?: string;
}

const HomeUserSavingsView: FC<IHomeProps> = ({ title, category }) => {
  return (
    <div className="border-grey mx-auto my-8 flex flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center px-6 py-6 sm:items-start">
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2 md:flex-row">
            <h2 className="flex self-center text-base font-bold md:text-lg lg:text-2xl">
              {title}
            </h2>
            {category && (
              <span className="flex self-center text-base font-bold cursor-pointer text-sky-500 md:text-md lg:text-lg hover:text-sky-400 hover:underline">
                <Link to={`/userSaving/all/view`}>{category}</Link>
              </span>
            )}
          </div>
          {/* <h4 className="pt-1 text-center text-sm sm:text-left">{subTitle}</h4> */}
        </div>
      </div>
      <div className="flex w-full flex-nowrap items-center justify-center overflow-x-hidden px-6 md:overflow-x-auto lg:overflow-x-hidden">
        {/* <div className="grid justify-center gap-x-8 pt-3 sm:h-full sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
        <div className="grid justify-center gap-x-8 pt-3 sm:h-full sm:w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-4">
          {/* {savingPlans.map((savingPlan: ISavingPlanDocument) => (
            <SavingPlanCardDisplayItem
              key={uuidv4()}
              savingPlan={savingPlan}
              linkTarget
              showEditIcon={false}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default HomeUserSavingsView;
