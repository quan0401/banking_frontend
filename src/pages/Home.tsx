import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import SavingPlansSlider from "@shared/slider/SavingPlansSlider";
import { FC, ReactElement, useEffect, useState } from "react";
import HomeUserSavingsView from "./home/HomeUserSavingsView";
import { IUserSavingDocument } from "@interfaces/userSaving.interface";
import { userSavingService } from "@services/api/userSaving/userSaving.service";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";

const Home: FC = (): ReactElement => {
  const [savingPlans, setSavingPlans] = useState<ISavingPlanDocument[]>([]);
  const [userSavings, setUserSavings] = useState<IUserSavingDocument[]>([]);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  useEffect(() => {
    savingPlanService
      .getAll()
      .then((res) => {
        setSavingPlans(res.data.savingPlans);
      })
      .catch((err) => {
        console.log(err);
      });
    if (authUser?.id) {
      userSavingService.getSavingPlans(`${authUser?.id}`).then((res) => {
        setUserSavings(res.data.userSavings);
      });
    }
  }, [authUser?.id]);

  console.log("userSavings", userSavings);

  return (
    <div>
      {savingPlans.length > 0 && (
        <SavingPlansSlider
          savingPlans={savingPlans}
          title={"Saving Plans"}
          subTitle={"Choose once and save for a lifetime"}
          // category={"recommendations"}
          type={"home"}
        />
      )}
      {savingPlans.length > 0 && (
        <HomeUserSavingsView
          savingPlans={savingPlans}
          title={"Current user's savings"}
          subTitle={"View all your savings"}
          category="View all your savings"
        />
      )}
    </div>
  );
};

export default Home;
