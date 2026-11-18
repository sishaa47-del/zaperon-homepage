import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { IndiaPage } from "./pages/India";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <IndiaPage />
  </StrictMode>
);
// Production pages are prerendered (scripts/prerender.mjs): hydrate them. The dev server renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
