import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store/storeConfig";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
