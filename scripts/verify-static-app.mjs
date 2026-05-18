import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/styles.css",
  "public/vendor/phaser.min.js"
];

await Promise.all(requiredFiles.map((file) => access(file)));

const html = await readFile("index.html", "utf8");
const js = await readFile("src/main.js", "utf8");

if (!html.includes("public/vendor/phaser.min.js")) {
  throw new Error("index.html must load local Phaser runtime.");
}

if (!js.includes("class FlappyQuestScene") || !js.includes("LEVELS")) {
  throw new Error("Game scene or level configuration is missing.");
}

console.log("Static Phaser app verification passed.");
