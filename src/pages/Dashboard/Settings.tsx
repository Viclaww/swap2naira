import { Helmet } from "react-helmet-async";
import DashNavbarLayout from "../../components/Dashboard/DashboardNav";
import UserSetting from "../../components/Dashboard/UserSetting";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings | Swap2Naira</title>
      </Helmet>
      <DashNavbarLayout>
        <UserSetting />
      </DashNavbarLayout>
    </>
  );
};

export default Settings;
