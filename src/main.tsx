import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/themeContext";
import { CurrencyProvider } from "./context/currencyContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
