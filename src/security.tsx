import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SecurityPage } from "./pages/Security";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SecurityPage />
  </StrictMode>,
);
