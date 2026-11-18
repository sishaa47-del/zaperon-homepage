import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { IndiaPage } from "./pages/India";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndiaPage />
  </StrictMode>,
);
