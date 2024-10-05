import Empty from "@components/Empty";
import { IAuthDocument } from "@interfaces/features/auth.interface";
import { authService } from "@services/axios";
import { FC, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import AdminViewUserHeader from "./adminViewUser/AdminViewUserHeader";
import AdminViewUserBody from "./adminViewUser/AdminViewUserBody";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { addSavingPlans } from "@redux/reducers/savingPlan.reducer";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import { transactionService } from "@services/api/transaction/transaction.service";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector, useAppDispatch } from "@redux/store";
import AdminUserTransactionsView from "./adminViewUser/AdminUserTransactionsView";
import AdminUserGraph from "./adminViewUser/AdminUserGraph";

const AdminViewUser: FC = (): ReactElement => {
  const { userId } = useParams<{ userId: string }>(); // Destructure userId from the URL parameters
  const [user, setUser] = useState<IAuthDocument | null>(null);

  const [transactions, setTransactions] = useState<ITransactionDocument[]>([]);
  const savingPlans = useAppSelector(
    (state: IReduxState) => state.savingPlans
  )!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      authService
        .getUserById(userId)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => console.log(err)); // Use userId in your service call

      savingPlanService
        .getAll()
        .then((res) => {
          const savingPlans: ISavingPlanDocument[] = res.data.savingPlans;
          dispatch(addSavingPlans({ savingPlans }));
        })
        .catch((err) => {
          console.log(err);
        });

      transactionService.getAllOfUserById(userId).then((res) => {
        setTransactions(res.data.transactions);
      });
    }
  }, [userId]); // Add userId as a dependency to useEffect

  return (
    <>
      {user ? (
        <div>
          <AdminViewUserHeader user={user} />
          <div className="lg:flex mt-6 gap-4">
            <div className="w-full lg:w-1/3 flex gap-4 flex-col">
              <AdminViewUserBody user={user} />
              <AdminUserGraph
                savingPlans={savingPlans}
                transactions={transactions}
              />
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-2/3">
              <AdminUserTransactionsView
                savingPlans={savingPlans}
                transactions={transactions}
              />
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default AdminViewUser;
