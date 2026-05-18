import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import "./verify-static-app.mjs";

const outputRoot = ".vercel/output";
const staticRoot = `${outputRoot}/static`;

await rm(outputRoot, { recursive: true, force: true });
await mkdir(staticRoot, { recursive: true });

await cp("index.html", `${staticRoot}/index.html`);
await cp("src", `${staticRoot}/src`, { recursive: true });
await cp("public", `${staticRoot}/public`, { recursive: true });

await writeFile(
  `${outputRoot}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index.html" }
      ]
    },
    null,
    2
  )
);

console.log("Vercel static output generated.");
