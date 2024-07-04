import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import SavingPlansSlider from "@shared/slider/SavingPlansSlider";
import { FC, ReactElement, useEffect, useState } from "react";
import HomeUserSavingsView from "./home/HomeUserSavingsView";
import { IReduxState } from "@interfaces/store.interface";
import { useAppDispatch, useAppSelector } from "@redux/store";
import HomeTransactionsView from "./home/HomeTransactionsView";
import HomeTotalGraph from "./home/HomeTotalGraph";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { transactionService } from "@services/api/transaction/transaction.service";
import { HomeContext } from "@contexts/homeContext";
import { CircularProgress, Collapse } from "@mui/material";
import { useLocation } from "react-router-dom";
import Button from "@shared/button/Button";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { addSavingPlans } from "@redux/reducers/savingPlan.reducer";

const Home: FC = (): ReactElement => {
  const [transactions, setTransactions] = useState<ITransactionDocument[]>([]);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const location = useLocation();
  const [showNetWorth, setShowNetWorth] = useState<boolean>(true);
  const savingPlans = useAppSelector(
    (state: IReduxState) => state.savingPlans
  )!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    savingPlanService
      .getAll()
      .then((res) => {
        const savingPlans: ISavingPlanDocument[] = res.data.savingPlans;
        dispatch(addSavingPlans({ savingPlans }));
      })
      .catch((err) => {
        console.log(err);
      });
    if (authUser?.id) {
      // userSavingService.getSavingPlans(`${authUser?.id}`).then((res) => {
      //   setUserSavings(res.data.userSavings);
      // });
      transactionService.getAllOfUser().then((res) => {
        setTransactions(res.data.transactions);
      });
    }
  }, [location]);

  return (
    <div>
      {savingPlans?.length === 0 ? (
        <CircularProgress />
      ) : (
        <HomeContext.Provider value={{ savingPlans, transactions }}>
          <div>
            <div className="lg:flex" key="home-components">
              <div className="w-full lg:w-1/2">
                <Button
                  className={`btn btn--primary ${!showNetWorth && "mb-12"}`}
                  // label={showNetWorth ? "Hide net worth" : "Show net worth"}
                  label={
                    <>
                      <div className="flex items-center gap-2.5">
                        <FaMoneyBillTransfer />
                        <span className="text-lg font-bold">
                          {showNetWorth ? "Hide" : "Show"} Net Worth
                        </span>
                      </div>
                      {showNetWorth ? (
                        <FaAngleUp size={20} />
                      ) : (
                        <FaAngleDown size={20} />
                      )}
                    </>
                  }
                  onClick={() => setShowNetWorth(!showNetWorth)}
                />
                <Collapse in={showNetWorth} timeout="auto" unmountOnExit>
                  <HomeTotalGraph key="home-total-graph" />
                </Collapse>
              </div>
              <div className="flex w-full lg:w-1/2 mb-20 lg:mb-0">
                <HomeTransactionsView key="home-transactions-view" />
              </div>
            </div>

            <SavingPlansSlider
              title={"Saving Plans"}
              subTitle={"Choose once and save for a lifetime"}
              // category={"recommendations"}
              type={"home"}
              key="saving-plans-slider"
            />
            <HomeUserSavingsView
              title={"Current user's savings"}
              subTitle={"View all your savings"}
              category="View all your savings"
              key="home-user-savings-view"
            />
          </div>
        </HomeContext.Provider>
      )}
    </div>
  );
};

export default Home;
