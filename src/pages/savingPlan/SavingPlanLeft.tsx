import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { FC, ReactElement } from "react";
import SavingPlanCard from "@components/SavingPlanCard";

interface ISavingPlanLeftProps {
  savingPlan: ISavingPlanDocument;
}

const SavingPlanLeft: FC<ISavingPlanLeftProps> = ({
  savingPlan,
}): ReactElement => {
  return (
    <div>
      <div className="relative flex cursor-pointer">
        {/* <img
          src={savingPlan.image}
          alt="SavingPlan Image"
          className="max-h-[480px] min-w-[400px] rounded-lg h-auto w-auto object-cover transition-all duration-500 hover:scale-105"
          // effect="blur"
        /> */}
        <SavingPlanCard savingPlan={savingPlan} width={340} height={380} />
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
        </>
      </div>
    </div>
  );
};

export default SavingPlanLeft;
