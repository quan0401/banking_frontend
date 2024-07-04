import Empty from "@components/Empty";
import Search from "@components/Search";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { IReduxState } from "@interfaces/store.interface";
import { IUserSavingDocument } from "@interfaces/userSaving.interface";
import { useAppSelector } from "@redux/store";
import { userSavingService } from "@services/api/userSaving/userSaving.service";
import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import UserSavingItem from "./userSaving/UserSavingItem";
import { savingPlanService } from "@services/api/savingPlan/savingPlan.service";
import { transactionService } from "@services/api/transaction/transaction.service";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { useEffectOnce } from "@hooks/useEffectOnce";
import PageHeader from "@layout/PageHeader";

const headers = [
  { label: "ID", key: "id" },
  { label: "User ID", key: "userId" },
  { label: "Saving Plan ID", key: "savingPlanId" },
  { label: "Total Amount", key: "totalAmount" },
  { label: "Last Updated", key: "lastUpdated" },
  { label: "Currency", key: "currency" },
  { label: "Target Amount", key: "targetAmount" },
  { label: "Created At", key: "createdAt" },
  { label: "Updated At", key: "updatedAt" },
  { label: "Version", key: "version" },
];

const AllUserSavings: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [query, setQuery] = useState<string>("");
  const [userSavings, setUserSavings] = useState<IUserSavingDocument[]>([]);
  const [savingPlans, setSavingPlans] = useState<ISavingPlanDocument[]>([]);

  const transactionsData = useEffectOnce<ITransactionDocument[]>(
    useCallback(() => transactionService.getAllOfUser(), [])
  );

  let transactions: ITransactionDocument[] = [];
  if (transactionsData?.transactions) {
    transactions = transactionsData.transactions;
  }

  useEffect(() => {
    if (authUser?.id) {
      userSavingService
        .getSavingPlans(authUser?.id)
        .then((res) => {
          setUserSavings(res.data.userSavings);
        })
        .catch((error) => {
          console.log(error);
        });
      savingPlanService
        .getAll()
        .then((res) => {
          setSavingPlans(res.data.savingPlans);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [authUser?.id]);

  return (
    <>
      <PageHeader title="Your savings" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          {/* <button className="btn btn--primary">
            Add new product <i className="icon-circle-plus-regular" />
          </button> */}
          {/* <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData} >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink> */}

          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={userSavings}
            headers={headers}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          placeholder="Search Product"
          query={query}
          setQuery={setQuery}
        />
        <div>
          {userSavings.length === 0 ||
          savingPlans.length === 0 ||
          transactions.length === 0 ? (
            <Empty />
          ) : (
            userSavings.map((userSaving, index) => {
              const found = savingPlans.find(
                (savingPlan) => savingPlan.id === userSaving.savingPlanId
              ) as ISavingPlanDocument;
              const filtedTransactions = transactions.filter(
                (tran) => tran.savingPlanId === userSaving.savingPlanId
              );
              return (
                <div key={index}>
                  <UserSavingItem
                    userSaving={userSaving}
                    index={index}
                    savingPlan={found}
                    transactions={filtedTransactions}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default AllUserSavings;
