import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import axios from "@services/axios";

class SavingPlanService {
  async getById(planId: string) {
    const response = await axios.get(`/savingPlan/${planId}`);
    return response;
  }

  async getAll() {
    const response = await axios.get("/savingPlan");
    return response;
  }

  async create(body: ISavingPlanDocument) {
    const response = await axios.post("/savingPlan", body);
    return response;
  }

  async updateById(planId: string) {
    const response = await axios.post(`/savingPlan/${planId}`);
    return response;
  }

  async deleteById(planId: string) {
    const response = await axios.delete(`/savingPlan/${planId}`);
    return response;
  }
}

export const savingPlanService = new SavingPlanService();
