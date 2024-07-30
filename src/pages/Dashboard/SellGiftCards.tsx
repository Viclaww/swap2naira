import DashNavbarLayout from "@/components/Dashboard/DashboardNav";
import UserSellCard from "@/components/Dashboard/UserSellCard";
import { Helmet } from "react-helmet-async";

const SellGiftCards = () => {
  return (
    <>
      <Helmet>
        <title>Sell Gift Cards | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserSellCard />
      </DashNavbarLayout>
    </>
  );
};

export default SellGiftCards;
