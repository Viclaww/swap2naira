import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserHistory from "../../components/Dashboard/UserHistory";

const History = () => {
  return (
    <>
      <Helmet>
        <title>History | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserHistory />
      </DashNavbarLayout>
    </>
  );
};

export default History;
