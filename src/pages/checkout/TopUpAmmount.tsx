import { PaymentContext } from "@contexts/paymentContext";
import Button from "@shared/button/Button";
import TextInput from "@shared/inputs/TextInput";
import { formatLargeNumber, showErrorToast } from "@utils/utils.service";
import { isNumber } from "lodash";
import { FC, ReactElement, useContext } from "react";

interface ITopUpAmmountProps {
  handleMakePayment: () => void;
}

const TopUpAmmount: FC<ITopUpAmmountProps> = ({
  handleMakePayment,
}): ReactElement => {
  const { amount, setAmount, savingPlan } = useContext(PaymentContext);

  const handleOnChange = (e: React.ChangeEvent) => {
    if (!setAmount) return;
    let value = (e.target as HTMLInputElement).value;
    if (value.trim() === "") setAmount(0);
    // Remove all commas: for example, 1.000.000 -> 1000000
    const newValue = parseFloat(value.replace(/\./g, ""));
    if (newValue > parseFloat(`${savingPlan.maximumEachTransaction}`)) {
      showErrorToast("Amount exceeds maximum limit");
      return;
    }
    if (!isNumber(newValue) || isNaN(newValue)) return;
    setAmount(newValue);
  };

  return (
    <div className="w-full text-center mt-20">
      <div className="flex justify-center">
        <TextInput
          className="bg-transparent focus:outline-none border-b-4 border-grey-200 text-2xl max-w-[400px]"
          placeholder={`Minimum: ${formatLargeNumber(
            parseFloat(`${savingPlan.minimumEachTransaction}`)
          )}`}
          value={amount === 0 ? "" : formatLargeNumber(amount)}
          onChange={handleOnChange}
        />
        <p
          className="text-[#95979d] font-bold"
          style={{
            marginTop: "10px",
          }}
        >
          {savingPlan.currency}
        </p>
      </div>
      <div className="flex justify-end lg:justify-start  mt-12">
        <Button
          disabled={
            amount === 0 ||
            amount < parseFloat(`${savingPlan.minimumEachTransaction}`)
          }
          className="btn btn--primary"
          label="Continue checkout"
          onClick={async () => await handleMakePayment()}
        />
      </div>
    </div>
  );
};

export default TopUpAmmount;
