// import routes from "./routes";
import "./App.css";
import Home from "./pages/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const routes = [{ path: "/", element: <Home /> }];
  const router = createBrowserRouter([...routes]);
  console.log("this is me 1");

  return (
    <div className=" relative overflow-hidden font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
