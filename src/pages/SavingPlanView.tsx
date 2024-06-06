import { FC, ReactElement, useEffect, useState } from "react";
import SavingPlanRight from "./savingPlan/SavingPlanRight";
import SavingPlanLeft from "./savingPlan/SavingPlanLeft";
import { useParams } from "react-router-dom";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { AxiosResponse } from "axios";
import CircularPageLoader from "@shared/CircularPageLoader";

const SavingPlanView: FC = (): ReactElement => {
  const { planId } = useParams();
  const [savingPlan, setSavingPlan] = useState<ISavingPlanDocument | null>(
    null
  );

  useEffect(() => {
    savingPlanService
      .getById(`${planId}`)
      .then((res: AxiosResponse) => {
        setSavingPlan(res?.data?.savingPlan);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      {!savingPlan ? (
        <CircularPageLoader />
      ) : (
        <>
          <div className="px-4 text-xl font-bold lg:text-3xl mb-3">
            {savingPlan.title}
          </div>
          <div className="flex w-full flex-wrap">
            <div className="w-full lg:w-1/2">
              <SavingPlanLeft savingPlan={savingPlan} />
            </div>
            <div className="w-full lg:w-1/2">
              <SavingPlanRight savingPlan={savingPlan} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default SavingPlanView;
