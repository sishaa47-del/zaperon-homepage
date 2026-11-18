// Inject build-time HTML into each built page so content is readable without JavaScript.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);

const pages = [
  ["home", "dist/index.html"],
  ["india", "dist/india/index.html"],
  ["security", "dist/security/index.html"],
];

for (const [page, file] of pages) {
  const path = resolve(root, file);
  const html = await readFile(path, "utf8");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`No empty #root in ${file}`);
  const out = html.replace(marker, `<div id="root">${render(page)}</div>`);
  await writeFile(path, out);
  console.log(`prerendered ${file} (${Math.round(out.length / 1024)} kB)`);
}
