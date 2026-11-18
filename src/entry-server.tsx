import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { IndiaPage } from "./pages/India";
import { SecurityPage } from "./pages/Security";
import { setServerPage } from "./paths";

/** Build-time prerender: static HTML for each page, so content reads without JavaScript. */
export function render(page: "home" | "india" | "security") {
  setServerPage(page === "home");
  const el = page === "home" ? <App /> : page === "india" ? <IndiaPage /> : <SecurityPage />;
  return renderToString(<StrictMode>{el}</StrictMode>);
}
