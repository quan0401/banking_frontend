import { FC } from "react";
import { darken } from "polished";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { formatLargeNumber } from "@utils/utils.service";

// interface ISavingPlanCardProps {
//   basicDescription: string;
//   title: string;
//   description: string;
//   interestRate: string;
//   subtitle: string;
//   color?: string;
//   width?: number;
//   height?: number;
// }

interface ISavingPlanCardProps {
  savingPlan: ISavingPlanDocument;
  width?: number | string;
  height?: number | string;
}

const SavingPlanCard: FC<ISavingPlanCardProps> = ({
  savingPlan,
  width = 280,
  height = 320,
}) => {
  // const { savingPlansColor } = useContext(ThemeContext);
  const color = savingPlan.image!;
  const headerColor = darken(0.1, color); // Slightly darker color for basicDescription

  return (
    <div
      className={`rounded-3xl px-6 p-4 !text-white flex flex-col justify-between `}
      style={{
        background: `linear-gradient(to bottom right, ${color}, ${darken(
          0.24,
          savingPlan.image!
        )})`,
        height,
        width,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <div
          className="px-3 py-1 text-sm rounded-full inline-block font-bold border-2 border-white"
          style={{ borderColor: darken(0.2, color), background: headerColor }}
        >
          {savingPlan.basicDescription}
        </div>
        <h2 className="mt-4 text-xl !text-white font-bold">
          {savingPlan.title}
        </h2>
        <p className="mt-2 text-lg">{`Start only with ${formatLargeNumber(
          savingPlan.minimumEachTransaction as number
        )} ${savingPlan.currency}`}</p>
      </div>

      <div>
        <div className="mt-4 text-3xl font-bold">
          {savingPlan.interestRate}%
        </div>
        <p className="text-lg">Target Profit Rate</p>
      </div>
    </div>
  );
};

export default SavingPlanCard;
