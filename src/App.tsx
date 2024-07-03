// import routes from "./routes";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./lib/store";

function App() {
  const router = createBrowserRouter([...routes]);

  return (
    <Provider store={store}>
      <div className=" relative overflow-hidden font-poppins">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
