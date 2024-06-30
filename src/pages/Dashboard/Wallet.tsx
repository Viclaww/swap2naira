import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserWallet from "../../components/Dashboard/UserWallet";

const Wallet = () => {
  return (
    <div>
      <DashNavbarLayout>
        <UserWallet />
      </DashNavbarLayout>
    </div>
  );
};

export default Wallet;
