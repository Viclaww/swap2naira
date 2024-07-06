// import routes from "./routes";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ModalProvider } from "./lib/context/ModalContext";

function App() {
  const router = createBrowserRouter([...routes]);

  return (
    <Provider store={store}>
      <ModalProvider>
        <div className=" relative overflow-hidden font-poppins">
          <RouterProvider router={router} />
        </div>
      </ModalProvider>
    </Provider>
  );
}

export default App;
