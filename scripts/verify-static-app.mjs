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

if (!html.includes('id="versionBadge"') || !html.includes("v0.2")) {
  throw new Error("Version badge v0.2 must be present in index.html.");
}

if (!css.includes(".version-badge")) {
  throw new Error("Version badge styles are missing.");
}

if (!js.includes('const APP_VERSION = "v0.2"') || !js.includes('versionBadgeEl.classList.toggle("hidden", status !== "menu")')) {
  throw new Error("Version badge must be controlled by menu status in main.js.");
}

for (const token of ["SAVE_KEY", "COIN_CHANCE", "SHIELD_TIERS", "SHRINK_TIERS", "buyUpgrade", "useShrinkSkill", "hasShieldProtection", "consumeShieldProtection", "grantLocalTestCoins"]) {
  if (!js.includes(token)) {
    throw new Error(`Growth harness check failed: ${token} is missing.`);
  }
}

if (!js.includes("const COIN_CHANCE = 0.28") || !js.includes("const COIN_VALUES = [1]")) {
  throw new Error("Coin economy must stay sparse and use 1 coin per pickup.");
}

for (const token of ["style: \"drone\"", "style: \"butterfly\"", "style: \"rocket\"", "droneBody", "butterflyWingLeft", "rocketNose"]) {
  if (!js.includes(token)) {
    throw new Error(`Skin template harness check failed: ${token} is missing.`);
  }
}

if (!html.includes("coinBalance") || !html.includes("shrinkSkillButton") || !css.includes(".skill-button")) {
  throw new Error("Growth economy and skill UI must be present.");
}

if (!js.includes("targetScore: 100")) {
  throw new Error("v0.2 must extend the game to a 100 point route.");
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
