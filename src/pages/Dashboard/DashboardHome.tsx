import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserDashboard from "../../components/Dashboard/UserDashboard";
import { useGetUserQuery } from "@/lib/api/generalApi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/reducers/userSlice";

const DashboardHome = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const { data } = useGetUserQuery(token as string);

  if (data && data.success) {
    console.log("Data", data.data.user);
    dispatch(setUser(data.data.user));
  }

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
