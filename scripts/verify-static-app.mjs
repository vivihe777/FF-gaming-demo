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
const css = await readFile("src/styles.css", "utf8");

if (!html.includes("public/vendor/phaser.min.js")) {
  throw new Error("index.html must load local Phaser runtime.");
}

if (!js.includes("class FlappyQuestScene") || !js.includes("LEVELS")) {
  throw new Error("Game scene or level configuration is missing.");
}

if (!html.includes('id="versionBadge"') || !html.includes("v.0.18")) {
  throw new Error("Version badge v.0.18 must be present in index.html.");
}

if (!css.includes(".version-badge")) {
  throw new Error("Version badge styles are missing.");
}

if (!js.includes('const APP_VERSION = "v.0.18"') || !js.includes('versionBadgeEl.classList.toggle("hidden", status !== "menu")')) {
  throw new Error("Version badge must be controlled by menu status in main.js.");
}

if (!js.includes("const WEATHER_SCORE_THRESHOLD = 20") || !js.includes("WEATHER_TYPES")) {
  throw new Error("Weather threshold and type configuration are missing.");
}

for (const method of ["createWeatherLayer", "unlockWeatherIfReady", "updateWeather", "updateRain", "updateLightning", "updateTornado", "resetWeather"]) {
  if (!js.includes(method)) {
    throw new Error(`Weather harness check failed: ${method} is missing.`);
  }
}

console.log("Static Phaser app harness verification passed.");
