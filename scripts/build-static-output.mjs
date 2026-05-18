import { cp, mkdir, rm } from "node:fs/promises";
import "./verify-static-app.mjs";

const outputRoot = "dist";

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

await cp("index.html", `${outputRoot}/index.html`);
await cp("CHANGELOG.md", `${outputRoot}/CHANGELOG.md`);
await cp("src", `${outputRoot}/src`, { recursive: true });
await cp("public", `${outputRoot}/public`, { recursive: true });

console.log("Generic static output generated.");
