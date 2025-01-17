import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Weather from "./components/Weather.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
