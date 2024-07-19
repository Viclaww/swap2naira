import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserDashboard from "../../components/Dashboard/UserDashboard";

const DashboardHome = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserDashboard />
      </DashNavbarLayout>
    </>
  );
};

export default DashboardHome;
