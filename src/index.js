import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EuiProvider, euiStylisPrefixer } from "@elastic/eui";
import createCache from "@emotion/cache";
import "@elastic/eui/dist/eui_theme_light.css"; // Import EUI theme CSS

const cache = createCache({
  key: "codesandbox",
  stylisPlugins: [euiStylisPrefixer],
  container: document.querySelector('meta[name="emotion-styles"]'),
});
cache.compat = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EuiProvider colorMode="light" cache={cache}>
    <App />
  </EuiProvider>
);

reportWebVitals();
