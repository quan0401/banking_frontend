import { IAuthDocument } from "./features/auth.interface";
import { ISavingPlanDocument } from "./features/savingPlan.interface";

export interface IReduxState {
  authUser?: IAuthDocument;
  header?: boolean;
  savingPlans?: ISavingPlanDocument[];
}
