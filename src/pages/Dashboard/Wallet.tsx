import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserWallet from "../../components/Dashboard/UserWallet";

const Wallet = () => {
  return (
    <div>
      <Helmet>
        <title>Wallet | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserWallet />
      </DashNavbarLayout>
    </div>
  );
};

export default Wallet;
