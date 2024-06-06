import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import SavingPlansSlider from "@shared/slider/SavingPlansSlider";
import { FC, ReactElement, useEffect, useState } from "react";

const Home: FC = (): ReactElement => {
  const [savingPlans, setSavingPlans] = useState<ISavingPlanDocument[]>([]);

  useEffect(() => {
    savingPlanService
      .getAll()
      .then((res) => {
        setSavingPlans(res.data.savingPlans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {savingPlans.length > 0 && (
        <SavingPlansSlider
          savingPlans={savingPlans}
          title={"Saving Plans"}
          subTitle={"Best saving Plans"}
          // category={"recommendations"}
          type={"home"}
        />
      )}
    </div>
  );
};

export default Home;
