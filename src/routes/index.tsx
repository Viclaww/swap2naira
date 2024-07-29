import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import History from "../pages/Dashboard/History";
// import Ranking from "../pages/Dashboard/Ranking";
import Wallet from "../pages/Dashboard/Wallet";
import Settings from "../pages/Dashboard/Settings";
import ProfileSettings from "../components/Settings/ProfileSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ChangePasswordComp from "@/pages/auth/ChangePassword";
import {
  ChangePassword,
  ChangeWithdrawalPin,
  ResetPin,
} from "../components/Settings/SecuritySettings";
import Account from "@/components/Settings/Accounts";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <DashboardHome /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/change-password", element: <ChangePasswordComp /> },
  {
    path: "/dashboard/settings",
    element: <Settings />,
    children: [
      { path: "profile", element: <ProfileSettings /> },
      { path: "account", element: <Account /> },
      {
        path: "Security",
        element: <SecuritySettings />,
        children: [
          { path: "change-password", element: <ChangePassword /> },
          { path: "change-withdrawal-pin", element: <ChangeWithdrawalPin /> },
          { path: "reset-pin", element: <ResetPin /> },
        ],
      },
    ],
  },

  { path: "/dashboard/history", element: <History /> },
  { path: "/dashboard/wallet", element: <Wallet /> },
];
export default routes;
