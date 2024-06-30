// import routes from "./routes";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([...routes]);

  return (
    <div className=" relative overflow-hidden font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
