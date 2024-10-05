import Button from "@shared/button/Button";
import { useNavigate } from "react-router-dom";
import AdminOpenPlanTable from "@components/adminComponents/reports/AdminOpenPlanTable";
import AdminReportByDate from "@components/adminComponents/reports/AdminReportByDate";
import AdminManageUsersTable from "@components/adminComponents/reports/AdminManageUsersTable";
import AdminReportByMonth from "@components/adminComponents/reports/AdminReportByMonth";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex-grow p-5">
        <h4 className="font-semibold">Admin Dashboard</h4>
        <div className="flex gap-4 pt-4">
          <Button
            label="Create Saving Plan"
            className="btn btn--primary"
            onClick={() => navigate("/admin/create-saving-plan")}
          />
        </div>
        <AdminManageUsersTable />
        <AdminOpenPlanTable />
        <div className="xl:flex xl:w-1/2 gap-4">
          <AdminReportByDate />
          <AdminReportByMonth />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
