// import routes from "./routes";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ModalProvider } from "./lib/context/ModalContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const router = createBrowserRouter([...routes]);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <ModalProvider>
          <div className=" relative overflow-hidden font-poppins">
            <RouterProvider router={router} />
          </div>
        </ModalProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
