import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import "./index.css";
import App from "./App.jsx";

window.store = store;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
