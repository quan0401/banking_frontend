import {
  ICheckPaymentStatusPayload,
  IMakePaymentPayload,
} from "@interfaces/features/transaciontion.interface";
import axios from "@services/axios";

class TransactionService {
  async pay(planId: string, data: IMakePaymentPayload) {
    const response = await axios.post(`/transaction/pay/${planId}`, data);
    return response;
  }

  async transactionByPlanIdAndUserId(planId: string) {
    const response = await axios.get(
      `/transaction/all/savingPlan/${planId}/user`
    );
    return response;
  }

  async checkPaymentStatus(data: ICheckPaymentStatusPayload) {
    const response = await axios.post(
      `/transaction/check-payment-status`,
      data
    );
    return response;
  }

  async getAllOfUser() {
    const response = await axios.get(`/transaction/all`);
    return response;
  }
}

export const transactionService = new TransactionService();
