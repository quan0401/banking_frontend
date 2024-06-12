export interface IUserSavingDocument {
  id?: string;
  userId?: string;
  savingPlanId?: string;
  totalAmount?: number;
  lastUpdated?: Date;
  currency?: string;
  targetAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
}
