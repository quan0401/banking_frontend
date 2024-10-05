import React, { FC, ReactElement } from "react";
import { FaRegCircle } from "react-icons/fa";
import visaImage from "@assets/visa.png";
import momoImage from "@assets/momo.png"; // Renamed import
import atmImage from "@assets/atm.png";
import { FaCircleCheck } from "react-icons/fa6";
import { IPaymentMethods } from "@interfaces/contexts.interface";

interface IPaymentMethodsProps {
  paymentMethod: IPaymentMethods;
  setPaymentMethod: React.Dispatch<React.SetStateAction<IPaymentMethods>>;
}

const PaymentMethods: FC<IPaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
}): ReactElement => {
  const selectPaymentMethod = (method: string) => {
    if (method !== "momo") return;
    const newPaymentMethod: IPaymentMethods = {
      momo: false,
      atm: false,
      visa: false,
    };
    // Assuming IPaymentMethods is a type that can have boolean properties for momo, atm, and visa
    newPaymentMethod[method] = true; // Dynamically setting the property based on the method
    if (setPaymentMethod) {
      setPaymentMethod(newPaymentMethod);
    }
  };
  return (
    <div className="flex rounded-[4px]  px-4 py-3">
      <div className="w-full">
        <p className="font-bold mb-4 text-amber-600">
          Only support MoMo at the moment
        </p>
        <div className="flex gap-4">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full">
              <img src={momoImage} alt="" className="rounded" />{" "}
              {/* Updated usage */}
            </div>
          </div>
          <div
            className="w-full cursor-pointer"
            onClick={() => selectPaymentMethod("momo")}
          >
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 justify-between">
              <span className="text-xl font-bold">Pay by MoMo</span>
              {paymentMethod.momo ? <FaCircleCheck /> : <FaRegCircle />}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 opacity-40 cursor-not-allowed">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full">
              <img src={atmImage} alt="" className="rounded" />{" "}
              {/* Updated usage */}
            </div>
          </div>
          <div className="w-full" onClick={() => selectPaymentMethod("atm")}>
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 justify-between">
              <span className="text-xl font-bold">Pay by ATM card</span>
              {paymentMethod.atm ? <FaCircleCheck /> : <FaRegCircle />}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 opacity-40 cursor-not-allowed">
          <div>
            <div className="flex h-12 w-12 items-center justify-center  bg-white">
              <img src={visaImage} alt="" className="rounded" />{" "}
              {/* Updated usage */}
            </div>
          </div>
          <div className="w-full" onClick={() => selectPaymentMethod("visa")}>
            <div className="border-grey mt-2 flex items-center gap-2 border-b pb-6 justify-between">
              <span className="text-xl font-bold">
                Pay by VISA/Master/JCB card
              </span>
              {paymentMethod.visa ? <FaCircleCheck /> : <FaRegCircle />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
