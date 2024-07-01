import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";

import History from "../pages/Dashboard/History";
// import Ranking from "../pages/Dashboard/Ranking";
import Wallet from "../pages/Dashboard/Wallet";
import Settings from "../pages/Dashboard/Account";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <DashboardHome /> },
  { path: "/dashboard/setting", element: <Settings /> },
  // { path: "/dashboard/ranking", element: <Ranking /> },
  { path: "/dashboard/history", element: <History /> },
  { path: "/dashboard/wallet", element: <Wallet /> },
];
export default routes;
