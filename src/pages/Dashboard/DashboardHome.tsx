import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import { useGetUserQuery } from "@/lib/api/generalApi";
import { useAppSelector } from "@/lib/hooks";

const DashboardHome = () => {
  const token = useAppSelector((state) => state.user.token);
  const { data } = useGetUserQuery(token as string);

  console.log(data, "token", token);

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
