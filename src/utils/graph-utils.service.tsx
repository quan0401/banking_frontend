import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { ReactElement, ReactNode } from "react";
import { calculateCompoundInterestToCurrentDate } from "./calculator.service";
import { shortenLargeNumbers } from "./utils.service";

export interface ViewBox {
  cx: number;
  cy: number;
}

interface IRender {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  payload: { name: string; value: number };
}

export const renderCustomizedLabel = (theme: string) => {
  return ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent: _percent,
    index: _index,
    payload,
  }: IRender) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={theme === "dark" ? "white" : "black"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        <tspan x={x} dy={-10}>
          {payload.name}
        </tspan>
        <tspan x={x} dy={20}>
          {formatTooltipValue(payload.value)}
        </tspan>
      </text>
    );
  };
};

export const renderLabelContent = (
  theme: string,
  compounds: number
): ContentType => {
  return ({ viewBox }: { viewBox: ViewBox }): ReactElement => {
    const { cx, cy } = viewBox;
    return (
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={theme === "dark" ? "white" : "black"}
      >
        <tspan x={cx} dy="-0.2em">
          Total property
        </tspan>
        <tspan x={cx} dy="1.2em" fontSize={18}>
          {shortenLargeNumbers(compounds, 2)}
        </tspan>
      </text>
    );
  };
};

// const renderCustomizedLabel1 = (props: any) => {
//   const { x, y, width, value } = props;
//   const radius = 25;

//   return (
//     <text
//       x={x + width / 2}
//       y={y - radius}
//       fill="#8884d8"
//       textAnchor="middle"
//       dominantBaseline="middle"
//     >
//       {value}
//     </text>
//   );
// };

export type ContentType = ReactElement | ((props: any) => ReactNode);

export const formatTooltipValue = (value: number) => {
  return `${value.toLocaleString()}`;
};

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#7034fc",
  "#fc345c",
  "#34fcdf",
  "#fc8f34",
  "#7dfc34",
];

import seedrandom from "seedrandom";

// Initialize seedrandom with a seed
const rng = seedrandom("your-seed-string-here");

const generateHexColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    // Generate a random hex digit using seeded RNG
    color += Math.floor(rng() * 16).toString(16);
  }
  return color;
};

export const generateColorList = (numColors: number) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(generateHexColor());
  }
  return colors;
};

export const handleDataForGraph = (
  data: ITransactionDocument[],
  savingPlans: ISavingPlanDocument[]
): any => {
  const keys: Record<string, Record<string, string>> = {};
  const interestRatesObj: Record<string, number> = {};
  for (const savingPlan of savingPlans) {
    keys[`${savingPlan.id}`] = {
      interestRate: `${savingPlan.interestRate}% Plan`,
      color: savingPlan.image!,
    };
    interestRatesObj[`${savingPlan.id}`] = savingPlan.interestRate as number;
  }
  const res: Record<string, number> = {};
  let totalBeforeCompounds = 0;

  for (const tran of data) {
    if (tran.isSuccessful === 0) continue;
    const afterCompound = calculateCompoundInterestToCurrentDate(
      tran.amount as number,
      interestRatesObj[`${tran.savingPlanId}`] / 100,
      1,
      `${tran.transactionDate}`
    );

    const percentKey = keys[`${tran.savingPlanId}`]?.interestRate;
    if (!res[percentKey]) {
      totalBeforeCompounds += tran.amount as number;
      res[percentKey] = afterCompound as number;
    } else {
      totalBeforeCompounds += tran.amount as number;
      res[percentKey] += afterCompound as number;
    }
  }

  const res2 = Object.entries(res).map(([key, value]) => {
    const color = Object.values(keys).find(
      (item) => item.interestRate === key
    )?.color;
    return { name: key, value: value, color: color };
  });

  return [res2, totalBeforeCompounds];
};
