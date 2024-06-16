import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import SavingPlanFeatures from "@shared/savingPlan/SavingPlanFeatures";
import { FC, ReactElement, useEffect, useState } from "react";
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import PaymentMethods from "./checkout/PaymentMethods";
import TotalCheckout from "./checkout/TotalCheckout";
import TopUpAmmount from "./checkout/TopUpAmmount";
import { PaymentContext } from "@contexts/paymentContext";
import { IPaymentMethods } from "@interfaces/contexts.interface";
import { transactionService } from "@services/api/transaction/transaction.service";
import { IMakePaymentPayload } from "@interfaces/features/transaciontion.interface";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import CircularPageLoader from "@shared/CircularPageLoader";
import {
  deleteFromLocalStorage,
  getDataFromLocalStorage,
  saveToLocalStorage,
  showSuccessToast,
} from "@utils/utils.service";
import SavingPlanCard from "@components/SavingPlanCard";

const Checkout: FC = (): ReactElement => {
  const [savingPlan, setSavingPlan] = useState<ISavingPlanDocument | null>(
    null
  );
  const { planId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethods>({
    momo: true,
    atm: false,
    visa: false,
  });

  const navigate: NavigateFunction = useNavigate();
  const orderId = queryParams.get("orderId");

  const handleMakePayment = async () => {
    const res = await transactionService.pay(`${savingPlan?.id}`, {
      amount: amount,
      transactionType: 1,
      bankAccountId: "momo",
    } as IMakePaymentPayload);
    const transactionId = res.data.transaction.id;
    const orderId = res.data.result.orderId;
    saveToLocalStorage("transactionId", transactionId);

    navigate(location.pathname + `?orderId=${orderId}`);
    // window.location.href = res.data.result.shortLink;
  };

  useEffect(() => {
    // handle popstate is for handling back navigation from the payment page, it fix the issue of the useEffect doesn't run when the user navigates back
    savingPlanService.getById(`${planId}`).then((res) => {
      setSavingPlan(res.data.savingPlan);
    });

    const handlePopState = () => {
      // Logic to handle back navigation
      // You might want to trigger your useEffect logic again here
      // For example, refetch data or reset states
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // TODO: this works but something wrong with momo payment
  // useEffect(() => {
  //   const transactionId = getDataFromLocalStorage("transactionId");
  // if (orderId && transactionId) {
  //   transactionService
  //     .checkPaymentStatus({
  //       orderId: `${orderId}`,
  //       savingPlanId: `${planId}`,
  //       transactionId: `${transactionId}`,
  //     })
  //     .then((res) => {
  //       if (res.data.resultCode === 0) {
  //         showSuccessToast("Payment successful");
  //         navigate(`/userSaving/${planId}`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   deleteFromLocalStorage("transactionId");
  // }
  // }, [orderId]);

  useEffect(() => {
    const transactionId = getDataFromLocalStorage("transactionId");
    if (orderId && transactionId) {
      transactionService
        .checkPaymentStatus({
          orderId: `${orderId}`,
          savingPlanId: `${planId}`,
          transactionId: `${transactionId}`,
        })
        .then((res) => {
          console.log("res.data.resultCode", res.data.resultCode);
          if (res.data.resultCode === 0) {
            showSuccessToast("Payment successful");
            navigate(`/userSaving/${planId}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      deleteFromLocalStorage("transactionId");
    }
  }, [orderId]);

  return (
    <div>
      {!savingPlan ? (
        <CircularPageLoader />
      ) : (
        <>
          <h2>Payment</h2>
          <PaymentContext.Provider
            value={{ amount, savingPlan: savingPlan, setAmount: setAmount }}
          >
            <div className="md:flex">
              <div className="w-full p-4 md:w-1/3">
                <div className="pt-3 pb-4 px-4 mb-2 flex flex-col border-b">
                  {/* <img
                    className="object-contain rounded-md max-h-30 max-w-[320px]"
                    src={savingPlan.image}
                  /> */}
                  <SavingPlanCard savingPlan={savingPlan} />
                </div>
                <SavingPlanFeatures savingPlan={savingPlan} />
                <TotalCheckout />
              </div>
              <div className="w-full p-4 md:w-2/3">
                <PaymentMethods
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                <TopUpAmmount handleMakePayment={handleMakePayment} />
              </div>
            </div>
          </PaymentContext.Provider>
        </>
      )}
    </div>
  );
};

export default Checkout;
