import tailwind from "bun-plugin-tailwind";
import { fileURLToPath } from "node:url";

const result = await Bun.build({
  entrypoints: [fileURLToPath(new URL("../index.html", import.meta.url))],
  outdir: "./dist",
  target: "browser",
  minify: true,
  plugins: [tailwind],
});

if (!result.success) {
  for (const message of result.logs) console.error(message);
  process.exit(1);
}

console.log("Static prototype written to dist/.");
