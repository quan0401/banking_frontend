import { useTheme } from "@contexts/themeContext";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { IReduxState } from "@interfaces/store.interface";
import { IUserSavingDocument } from "@interfaces/userSaving.interface";
import { Collapse } from "@mui/material";
import { useAppSelector } from "@redux/store";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import { transactionService } from "@services/api/transaction/transaction.service";
import { userSavingService } from "@services/api/userSaving/userSaving.service";
import CircularPageLoader from "@shared/CircularPageLoader";
import { calculateBaseOnTransactions } from "@utils/calculator.service";
import { TimeAgo } from "@utils/timeago.utils";
import { formatLargeNumber } from "@utils/utils.service";
import { FC, ReactElement, useEffect, useState } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import QuickViewTransaction from "./userSaving/QuickViewTransaction";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SavingPlanCard from "@components/SavingPlanCard";
import SubPlanView from "./userSaving/SubPlanView";

const UserSavingView: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { savingPlanId } = useParams();
  const { theme } = useTheme();
  const [userSaving, setUserSaving] = useState<IUserSavingDocument | null>(
    null
  );
  const [savingPlan, setSavingPlan] = useState<ISavingPlanDocument | null>(
    null
  );
  const [transactions, setTransactions] = useState<
    ITransactionDocument[] | null
  >();
  const [active, setActive] = useState(false);

  let compounds: number = 0;
  if (transactions && savingPlan) {
    compounds = calculateBaseOnTransactions(transactions, savingPlan);
    console.log("compounds:::", compounds);
  }

  useEffect(() => {
    if (savingPlanId && authUser?.id) {
      // userSaving
      userSavingService
        .getSavingPlan(`${authUser?.id}`, savingPlanId)
        .then((res) => {
          setUserSaving(res.data.userSaving);
        });
      // savingPlan details
      savingPlanService.getById(`${savingPlanId}`).then((res) => {
        setSavingPlan(res.data.savingPlan);
      });
      // get all transactions
      transactionService
        .transactionByPlanIdAndUserId(`${savingPlanId}`)
        .then((res) => {
          setTransactions(res.data.transactions);
        })
        .catch((err) => {
          console.log("err::::", err);
        });
    }
  }, [authUser?.id, savingPlanId]);

  return (
    <div>
      <>
        {!userSaving || !savingPlan || !transactions ? (
          <CircularPageLoader />
        ) : (
          <div>
            <div className="flex flex-col lg:flex-row">
              <div className="order-last lg:order-none  w-full lg:w-1/3 cursor-pointer">
                <div>
                  <button
                    className={`flex text-4xl items-center btn btn--primary ${
                      active ? "active mb-8" : ""
                    }`}
                    onClick={() => setActive(!active)}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* <i className={`icon icon-${}`} /> */}
                      <FaMoneyBillTransfer />
                      <span className="text-lg font-bold">
                        History of this plan
                      </span>
                    </div>
                    {active ? (
                      <FaAngleUp size={20} />
                    ) : (
                      <FaAngleDown size={20} />
                    )}
                  </button>
                  <Collapse in={active} timeout="auto" unmountOnExit>
                    <div className="submenu flex  flex-col gap-3">
                      {transactions.map((tran, index) => {
                        return (
                          <div key={index}>
                            <hr
                              className={`border-grey ${
                                theme === "light" && "border-gray"
                              }`}
                            />
                            <QuickViewTransaction
                              transaction={tran}
                              savingPlan={savingPlan}
                            />

                            <hr
                              className={`border-grey ${
                                theme === "light" && "border-gray"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <>
                  <div className="rounded-lg">
                    <div className="lg:flex font-bold justify-center items-center lg:justify-start mb-2 border-b px-4 pb-4 pt-3">
                      {/* <img
                      className="h-[400px] max-w-[300px] object-contain inline-block"
                      src={savingPlan?.image}
                      alt="Gig Cover Image"
                    /> */}
                      <SavingPlanCard savingPlan={savingPlan} />

                      <div className="ml-4 mt-4 lg:mt-0">
                        <h4 className="text-md font-bold">
                          {savingPlan?.title}
                        </h4>
                        <span
                          className={`mt-1 rounded text-md font-bold uppercase`}
                        >
                          {savingPlan?.basicDescription}
                        </span>
                      </div>
                    </div>
                    <ul className="mb-0 list-none">
                      <li className="font-bold justify-between px-4 pb-2 pt-2">
                        <div className="gap-2 text-md">Description</div>
                        <span className="text-sm font-bold text-green-500 line-clamp-2">
                          {savingPlan?.description}
                        </span>
                      </li>
                      <li className="flex justify-between px-4 pb-2 pt-2">
                        <div className="flex font-bold gap-2 text-md">
                          Interest rate
                        </div>
                        <span className="text-md font-bold">
                          {savingPlan?.interestRate} %
                        </span>
                      </li>
                      <li className="flex justify-between px-4 pb-2 pt-2">
                        <div className="flex font-bold gap-2 text-md">
                          Created at
                        </div>
                        <span className="text-md font-bold">
                          {userSaving?.createdAt &&
                            TimeAgo.dayMonthYear(`${userSaving.createdAt}`)}
                        </span>
                      </li>
                      <li className="flex justify-between px-4 pb-4 pt-2">
                        <div className="flex font-bold gap-2 text-md">
                          Current Profit
                        </div>
                        <span className="text-md font-bold">
                          {userSaving.totalAmount &&
                            formatLargeNumber(
                              compounds - userSaving.totalAmount
                            )}{" "}
                          {savingPlan?.currency}
                        </span>
                      </li>

                      <li className="flex justify-between px-4 pb-4 pt-2">
                        <div className="flex font-bold gap-2 text-md">
                          Amount before compound
                        </div>
                        <span className="text-md font-bold">
                          {userSaving?.totalAmount &&
                            formatLargeNumber(userSaving.totalAmount)}{" "}
                          {savingPlan?.currency}
                        </span>
                      </li>
                      <hr
                        className={`border-grey my-3 ${
                          theme === "light" && "border-gray"
                        }`}
                      />

                      <li className="flex justify-between px-4 pb-4">
                        <div className="flex font-bold gap-2 text-lg">
                          Total
                        </div>
                        <span className="text-lg font-bold">
                          {formatLargeNumber(compounds)} {savingPlan?.currency}
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              </div>
            </div>
            <SubPlanView
              transactions={transactions.filter(
                (tran) => tran.isSuccessful === 1
              )}
              savingPlan={savingPlan}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default UserSavingView;
