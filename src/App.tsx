// import routes from "./routes";
import "./App.css";
import Home from "./pages/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardHome from "./pages/Dashboard/DashboardHome";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "dashboard", element: <DashboardHome /> },
  ];
  const router = createBrowserRouter([...routes]);

  return (
    <div className=" relative overflow-hidden font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
