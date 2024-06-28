import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserDashboard from "../../components/Dashboard/UserDashboard";

const DashboardHome = () => {
  return (
    <>
      <DashNavbarLayout>
        <UserDashboard />
      </DashNavbarLayout>
    </>
  );
};

export default DashboardHome;
