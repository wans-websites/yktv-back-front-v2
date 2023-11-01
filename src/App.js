import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/app/store";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
