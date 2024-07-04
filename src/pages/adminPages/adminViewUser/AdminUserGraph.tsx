import { useTheme } from "@contexts/themeContext";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { calculateBaseOnTransactions } from "@utils/calculator.service";
import {
  handleDataForGraph,
  renderCustomizedLabel,
  renderLabelContent,
} from "@utils/graph-utils.service";
import { shortenLargeNumbers } from "@utils/utils.service";
import { FC, ReactElement } from "react";
import { FaCartPlus } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";

interface IAdminUserGraphProps {
  savingPlans: ISavingPlanDocument[];
  transactions: ITransactionDocument[];
}

const AdminUserGraph: FC<IAdminUserGraphProps> = ({
  savingPlans,
  transactions,
}): ReactElement => {
  let compounds: number = 0;
  const { theme } = useTheme();

  if (transactions && savingPlans) {
    compounds = calculateBaseOnTransactions(transactions, savingPlans);
  }

  const [data2, totalBeforeCompounds] = handleDataForGraph(
    transactions,
    savingPlans
  );

  const formatTooltipValue = (value: number, _name: string, _payload: any) => {
    const proportion = (value / compounds) * 100;
    return `(${proportion.toFixed(2)}%)`;
  };

  return (
    <div className="w-full">
      {transactions.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data2}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#82ca9d"
              label={renderCustomizedLabel(theme)}
            >
              {data2.map((entry: any, index: number) => {
                return <Cell key={`cell-${index}`} fill={entry?.color} />;
              })}
              <Label
                position="center"
                content={renderLabelContent(theme, compounds)}
              />
            </Pie>
            <Tooltip formatter={formatTooltipValue} />{" "}
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="grid grid-cols-2 gap-y-4 mb-8">
        <div className="flex flex-col">
          <span className="flex items-center">
            <FaCartPlus size={20} className="mr-1" />
            Net property
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-normal">
            {shortenLargeNumbers(totalBeforeCompounds, 2)} VND
          </span>
        </div>

        <div className="flex flex-col">
          <span className="flex items-center">
            <FaCartPlus size={20} className="mr-1" />
            After compounds
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-normal">
            {shortenLargeNumbers(compounds, 2)} VND
          </span>
        </div>

        {/* <BarChart width={500} height={300} data={data2} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            <LabelList
              dataKey="interestRate"
              content={renderCustomizedLabel1}
            />
          </Bar>
        </BarChart> */}
      </div>
    </div>
  );
};

export default AdminUserGraph;
