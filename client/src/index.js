import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TokenProvider from "./contexts/Token1Context";
import Bridge from "./contexts/BridgeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TokenProvider>
      <Bridge>
        <App />
      </Bridge>
    </TokenProvider>
  </BrowserRouter>
);
