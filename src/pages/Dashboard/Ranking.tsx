import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserRanking from "../../components/Dashboard/UserRanking";

const Ranking = () => {
  return (
    <>
      <Helmet>
        <title>History | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserRanking />
      </DashNavbarLayout>
    </>
  );
};

export default Ranking;
