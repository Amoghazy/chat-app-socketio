import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./RTK/store.ts";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </HelmetProvider>
  // </React.StrictMode>
);
