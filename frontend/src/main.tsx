import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { StoreProvider } from "./Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18next";
import { Suspense } from "react";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:5010" : "/";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.ts")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback="loading">
    <StoreProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </Suspense>
);
