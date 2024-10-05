import {
  IReduxAddSavingPlan,
  ISavingPlanDocument,
} from "@interfaces/features/savingPlan.interface";
import { createSlice, Slice } from "@reduxjs/toolkit";

const initiValue: ISavingPlanDocument[] = [];

const savingPlanSlice: Slice = createSlice({
  name: "savingPlan",
  initialState: initiValue,
  reducers: {
    addSavingPlans: (
      state: ISavingPlanDocument[],
      action: IReduxAddSavingPlan
    ) => {
      const { savingPlans } = action.payload;
      state.push(...savingPlans!);

      const uniqueState = state.filter((savingPlan, index, self) => {
        return self.findIndex((t) => t.id === savingPlan.id) === index;
      });

      state.splice(0, state.length, ...uniqueState);
    },
  },
});

export const { addSavingPlans } = savingPlanSlice.actions;
export default savingPlanSlice.reducer;
