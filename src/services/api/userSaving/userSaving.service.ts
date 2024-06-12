import axios from "@services/axios";

class UserSavingService {
  async getSavingPlans(userId: string) {
    const response = await axios.get(`/userSaving/${userId}`);
    return response;
  }
  async getSavingPlan(userId: string, savingPlanId: string) {
    const response = await axios.get(`/userSaving/${userId}/${savingPlanId}`);
    return response;
  }
}

export const userSavingService = new UserSavingService();
