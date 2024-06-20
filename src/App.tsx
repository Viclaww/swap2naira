// import routes from "./routes";
import "./App.css";
import Home from "./pages/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/aurh/Login";
import Register from "./pages/aurh/Register";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];
  const router = createBrowserRouter([...routes]);

  return (
    <div className=" relative overflow-hidden font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
