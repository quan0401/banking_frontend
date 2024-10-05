import Empty from "@components/Empty";
import { FC, ReactElement, useEffect, useState } from "react";
import AdminReport from "./AdminReport";
import { authService } from "@services/axios";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";

interface IUsersData {
  id: string;
  username: string;
  email: string;
  transactionCount: number;
  totalTopUpAmount: number;
  totalWithdrawalAmount: number;
}

const AdminManageUsersTable: FC = (): ReactElement => {
  const [users, setUsers] = useState<IUsersData[]>([]);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [pagination, setPagination] = useState({ limit: 5, offset: 0 });
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    authService
      .getUsersPagination(pagination.offset, pagination.limit)
      .then((res) => {
        setTotal(res.data.total);
        // If offset is 0, it's likely a new fetch, so replace users; otherwise, append
        if (pagination.offset === 0) {
          setUsers(res.data.users);
        } else {
          setUsers((prev) => [...prev, ...res.data.users]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination.limit, pagination.offset]);

  return (
    <div>
      <h3 className="my-3">Users</h3>
      {users.length > 0 ? (
        <AdminReport
          total={total}
          pagination={pagination}
          setPagination={setPagination}
          data={users.map((user) => {
            return {
              username:
                authUser?.id === user.id
                  ? `${user.username} (You)`
                  : user.username,
              userId: user.id,
              email: user.email,
              transactionCount: user.transactionCount,
              totalAmount: user.totalTopUpAmount,
              expenseAmount: user.totalWithdrawalAmount,
              linkTarget: `/admin/view/user/${user.id}`,
            };
          })}
          highlight={[users.findIndex((user) => user.id === authUser?.id)]}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default AdminManageUsersTable;
