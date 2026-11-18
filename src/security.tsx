import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { SecurityPage } from "./pages/Security";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <SecurityPage />
  </StrictMode>
);
// Production pages are prerendered (scripts/prerender.mjs): hydrate them. The dev server renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
