const APP_VERSION = "v.0.18";
const WEATHER_SCORE_THRESHOLD = 20;
const WEATHER_TYPES = ["lightning", "rain", "tornado", "thunderstorm"];

const LEVELS = [
  { id: 1, name: "晨风港", targetScore: 5, pipeSpeed: 185, pipeGap: 228, pipeInterval: 1680, gravity: 1180, fallGravity: 1600, maxFallSpeed: 720, flapVelocity: -302, maxStep: 62, windPush: 0, movingGates: false, challenge: "穿过 5 道宽风门", reward: "2 秒护盾" },
  { id: 2, name: "绿塔航线", targetScore: 10, pipeSpeed: 198, pipeGap: 216, pipeInterval: 1620, gravity: 1200, fallGravity: 1660, maxFallSpeed: 742, flapVelocity: -306, maxStep: 66, windPush: 0, movingGates: false, challenge: "风门略窄，保持节奏", reward: "下一关开局减速" },
  { id: 3, name: "斜阳峡", targetScore: 15, pipeSpeed: 212, pipeGap: 204, pipeInterval: 1560, gravity: 1225, fallGravity: 1735, maxFallSpeed: 768, flapVelocity: -310, maxStep: 72, windPush: 0, movingGates: false, challenge: "速度提升，连续穿越", reward: "额外 1 分" },
  { id: 4, name: "逆流湾", targetScore: 20, pipeSpeed: 228, pipeGap: 194, pipeInterval: 1500, gravity: 1250, fallGravity: 1820, maxFallSpeed: 798, flapVelocity: -314, maxStep: 78, windPush: -10, movingGates: false, challenge: "逆风轻推，提前修正高度", reward: "2.5 秒护盾" },
  { id: 5, name: "星桥", targetScore: 25, pipeSpeed: 246, pipeGap: 184, pipeInterval: 1440, gravity: 1280, fallGravity: 1920, maxFallSpeed: 832, flapVelocity: -320, maxStep: 84, windPush: 0, movingGates: true, challenge: "部分风门上下浮动", reward: "稳定翼，下一关重力降低" },
  { id: 6, name: "雾岭", targetScore: 30, pipeSpeed: 264, pipeGap: 174, pipeInterval: 1380, gravity: 1310, fallGravity: 2030, maxFallSpeed: 870, flapVelocity: -326, maxStep: 90, windPush: 12, movingGates: true, challenge: "顺风扰动，门距继续收紧", reward: "额外 2 分" },
  { id: 7, name: "高压航道", targetScore: 35, pipeSpeed: 284, pipeGap: 164, pipeInterval: 1320, gravity: 1345, fallGravity: 2160, maxFallSpeed: 912, flapVelocity: -332, maxStep: 96, windPush: 0, movingGates: true, challenge: "高速浮动风门", reward: "3 秒护盾" },
  { id: 8, name: "晶脉裂谷", targetScore: 40, pipeSpeed: 306, pipeGap: 154, pipeInterval: 1260, gravity: 1385, fallGravity: 2310, maxFallSpeed: 958, flapVelocity: -338, maxStep: 102, windPush: -16, movingGates: true, challenge: "高速逆风，容错降低", reward: "下一关开局减速" },
  { id: 9, name: "雷鸣门", targetScore: 45, pipeSpeed: 330, pipeGap: 144, pipeInterval: 1200, gravity: 1430, fallGravity: 2480, maxFallSpeed: 1008, flapVelocity: -344, maxStep: 108, windPush: 18, movingGates: true, challenge: "强风与窄门同时出现", reward: "最终关额外护盾" },
  { id: 10, name: "天穹终点", targetScore: 52, pipeSpeed: 356, pipeGap: 136, pipeInterval: 1140, gravity: 1480, fallGravity: 2660, maxFallSpeed: 1064, flapVelocity: -350, maxStep: 114, windPush: 0, movingGates: true, challenge: "最快、最窄、浮动最多", reward: "天穹完赛徽章" }
];

const THEMES = [
  { name: "晨风港", top: 0x163944, bottom: 0x0b1b22, haze: 0x70d4b7, star: 0xf6fbf7, gateA: 0x67d8b1, gateB: 0x4ca6d8, ground: 0x20302b, accent: 0xf6d365 },
  { name: "斜阳峡", top: 0x402a3d, bottom: 0x171725, haze: 0xff9d76, star: 0xffe2ad, gateA: 0xffb45e, gateB: 0xd85f71, ground: 0x302421, accent: 0xffdf79 },
  { name: "星桥", top: 0x172046, bottom: 0x0b1024, haze: 0x7d74ff, star: 0xe8edff, gateA: 0x8b7dff, gateB: 0x4fd0ff, ground: 0x1b2444, accent: 0xd9e4ff },
  { name: "晶脉裂谷", top: 0x1b1734, bottom: 0x08151f, haze: 0x8ee5c0, star: 0xd9fff0, gateA: 0x52e3c2, gateB: 0x8768ff, ground: 0x172a31, accent: 0xfff09b },
  { name: "雷鸣天穹", top: 0x241326, bottom: 0x08080f, haze: 0xffe15c, star: 0xffffff, gateA: 0xffd45c, gateB: 0xff4f7e, ground: 0x2a1d2d, accent: 0xffffff }
];

const SKINS = {
  aurora: { body: 0x42f5b9, bodyDark: 0x16856e, wing: 0x3a83ff, trail: 0x8ee5c0 },
  ember: { body: 0xffce5c, bodyDark: 0xb7472d, wing: 0xff4f5e, trail: 0xff9d4d },
  lunar: { body: 0xd9e4ff, bodyDark: 0x6550d6, wing: 0x7657ff, trail: 0xb5c7ff }
};

const scoreEl = document.querySelector("#score");
const levelEl = document.querySelector("#level");
const challengeEl = document.querySelector("#challenge");
const progressBarEl = document.querySelector("#progressBar");
const menuEl = document.querySelector("#menu");
const statusTextEl = document.querySelector("#statusText");
const rewardTextEl = document.querySelector("#rewardText");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const homeButton = document.querySelector("#homeButton");
const pauseButton = document.querySelector("#pauseButton");
const versionBadgeEl = document.querySelector("#versionBadge");
const skinButtons = [...document.querySelectorAll(".skin-option")];

let selectedSkin = "aurora";
let scene;

const isMobileViewport = window.matchMedia("(pointer: coarse), (max-width: 760px)").matches;
const renderResolution = isMobileViewport ? 2 : 1;
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const gameWidth = Math.round(viewportWidth * renderResolution);
const gameHeight = Math.round(viewportHeight * renderResolution);
const toRenderValue = (value) => value * renderResolution;

const scaleLevel = (level) => ({
  ...level,
  pipeSpeed: toRenderValue(level.pipeSpeed),
  pipeGap: toRenderValue(level.pipeGap),
  gravity: toRenderValue(level.gravity),
  fallGravity: toRenderValue(level.fallGravity),
  maxFallSpeed: toRenderValue(level.maxFallSpeed),
  flapVelocity: toRenderValue(level.flapVelocity),
  maxStep: toRenderValue(level.maxStep),
  windPush: toRenderValue(level.windPush)
});

const getLevelForScore = (score) => {
  const index = LEVELS.findIndex((level) => score < level.targetScore);
  return index === -1 ? LEVELS.length - 1 : index;
};

const getPreviousTarget = (levelIndex) => (levelIndex === 0 ? 0 : LEVELS[levelIndex - 1].targetScore);

const setMenuVisible = (visible) => {
  menuEl.classList.toggle("hidden", !visible);
};

const setStatusCopy = (status) => {
  versionBadgeEl.textContent = APP_VERSION;
  versionBadgeEl.classList.toggle("hidden", status !== "menu");

  if (status === "gameover") {
    setMenuVisible(true);
    statusTextEl.textContent = "撞上风门了。换个节奏，重新起飞。";
    startButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
    homeButton.classList.remove("hidden");
    pauseButton.textContent = "II";
    return;
  }

  if (status === "complete") {
    setMenuVisible(true);
    statusTextEl.textContent = "10 关全部完成，天穹航线通关。";
    startButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
    homeButton.classList.remove("hidden");
    pauseButton.textContent = "II";
    return;
  }

  if (status === "paused") {
    setMenuVisible(true);
    statusTextEl.textContent = "已暂停。继续后从当前航线恢复。";
    startButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
    homeButton.classList.remove("hidden");
    pauseButton.textContent = "▶";
    return;
  }

  if (status === "playing") {
    setMenuVisible(false);
    pauseButton.textContent = "II";
    return;
  }

  setMenuVisible(true);
  statusTextEl.textContent = "点击、触屏或按空格上升，穿过风门完成闯关。";
  startButton.classList.remove("hidden");
  restartButton.classList.add("hidden");
  homeButton.classList.add("hidden");
  pauseButton.textContent = "II";
};

const updateHud = ({ score, levelIndex, progress, challenge, reward }) => {
  const level = LEVELS[levelIndex];
  scoreEl.textContent = String(score);
  levelEl.textContent = `${level.id} / ${LEVELS.length}`;
  challengeEl.textContent = challenge;
  progressBarEl.style.width = `${Math.round(progress * 100)}%`;
  rewardTextEl.textContent = `奖励：${reward}`;
};

class FlappyQuestScene extends Phaser.Scene {
  constructor() {
    super("FlappyQuestScene");
    this.pipes = [];
    this.status = "menu";
    this.score = 0;
    this.levelIndex = 0;
    this.velocityY = 0;
    this.elapsed = 0;
    this.shieldUntil = 0;
    this.slowUntil = 0;
    this.lastPipeAt = 0;
    this.crashUntil = 0;
    this.flapLiftUntil = 0;
    this.lastFlapAt = 0;
    this.flapBoostUntil = 0;
    this.lastGapCenter = 0;
    this.flapPulseUntil = 0;
    this.nextTrailAt = 0;
    this.trailCursor = 0;
    this.shieldStrokeActive = false;
    this.weatherUnlocked = false;
    this.weatherType = "clear";
    this.nextWeatherSwapAt = 0;
    this.nextLightningAt = 0;
    this.lightningUntil = 0;
    this.tornadoPhase = 0;
  }

  create() {
    this.createWorld();
    this.createBird();
    this.createFloatingText();
    this.bindInput();
    this.emitHud();
    scene = this;
    this.scene.pause();
  }

  update(_time, deltaMs) {
    if (this.status !== "playing") return;

    const delta = Math.min(deltaMs / 1000, 0.033);
    this.elapsed += deltaMs;
    const level = this.currentLevel();
    const speedScale = this.elapsed < this.slowUntil ? 0.82 : 1;
    const flapBoost = this.elapsed < this.flapBoostUntil ? 1.16 : 1;
    const pipeSpeed = level.pipeSpeed * speedScale * flapBoost;
    const fallPressure = this.velocityY > 0 ? Phaser.Math.Clamp(this.velocityY / 520, 0, 0.55) : 0;
    const verticalGravity = this.velocityY > 0 ? level.fallGravity * (1 + fallPressure) : level.gravity;
    const liftAssist = 0;

    this.velocityY += (verticalGravity + level.windPush - liftAssist) * delta;
    this.velocityY = Phaser.Math.Clamp(this.velocityY, toRenderValue(-430), level.maxFallSpeed);
    this.bird.y += this.velocityY * delta;
    const targetRotation =
      this.velocityY < 0
        ? Phaser.Math.Clamp(this.velocityY / 720, -0.48, -0.08)
        : Phaser.Math.Clamp(0.14 + this.velocityY / 540, 0.14, 1);
    this.bird.rotation = Phaser.Math.Linear(this.bird.rotation, targetRotation, this.velocityY < 0 ? 0.22 : 0.32);
    this.ground.tilePositionX += pipeSpeed * delta;

    if (this.elapsed - this.lastPipeAt > level.pipeInterval) {
      this.spawnPipe(level);
      this.lastPipeAt = this.elapsed;
    }

    this.updatePipes(delta, pipeSpeed);
    this.updateBirdEffects(delta);
    this.updateTrail(delta, pipeSpeed);
    this.updateWeather(delta, pipeSpeed);
    this.checkBounds();
  }

  startGame() {
    this.resetGame();
    this.status = "playing";
    this.scene.resume();
    setStatusCopy(this.status);
    this.emitHud();
  }

  restartGame() {
    this.startGame();
  }

  returnToMenu() {
    this.clearPipes();
    this.status = "menu";
    this.score = 0;
    this.levelIndex = 0;
    this.velocityY = 0;
    this.elapsed = 0;
    this.shieldUntil = 0;
    this.slowUntil = 0;
    this.crashUntil = 0;
    this.flapLiftUntil = 0;
    this.lastFlapAt = 0;
    this.flapBoostUntil = 0;
    this.lastGapCenter = 0;
    this.flapPulseUntil = 0;
    this.nextTrailAt = 0;
    this.shieldStrokeActive = false;
    this.resetWeather();
    this.resetBirdVisuals();
    this.bird.setPosition(this.scale.width * 0.32, this.scale.height * 0.48);
    this.emitHud();
    setStatusCopy(this.status);
  }

  setSkin(skinId) {
    selectedSkin = skinId;
    this.paintBird();
  }

  togglePause() {
    if (this.status === "playing") {
      this.status = "paused";
      this.scene.pause();
      setStatusCopy(this.status);
      return;
    }

    if (this.status === "paused") {
      this.status = "playing";
      this.scene.resume();
      setStatusCopy(this.status);
    }
  }

  createWorld() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor("#0b1921");

    const sky = this.add.graphics();
    sky.fillGradientStyle(0x102832, 0x102832, 0x163f48, 0x0d1c24, 1);
    sky.fillRect(0, 0, width, height);

    this.stars = this.add.group();
    for (let i = 0; i < 34; i += 1) {
      this.stars.add(
        this.add.circle(
          Phaser.Math.Between(0, width),
          Phaser.Math.Between(toRenderValue(35), height - toRenderValue(110)),
          Phaser.Math.FloatBetween(toRenderValue(0.8), toRenderValue(2.2)),
          0xf6fbf7,
          Phaser.Math.FloatBetween(0.18, 0.55)
        )
      );
    }

    this.ground = this.add.tileSprite(width / 2, height - toRenderValue(32), width, toRenderValue(64), "__DEFAULT");
    this.ground.setTint(0x20302b);
    this.ground.setAlpha(0.95);
    this.createThemeLayers();
    this.createWeatherLayer();
  }

  createThemeLayers() {
    this.themeGraphics = this.add.graphics().setDepth(-20);
    this.currentThemeIndex = -1;
    this.applyTheme(0, true);
  }

  createWeatherLayer() {
    this.weatherDim = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x071014, 0);
    this.weatherDim.setDepth(-12);
    this.weatherGraphics = this.add.graphics().setDepth(-11);
    this.lightningGraphics = this.add.graphics().setDepth(9);
    this.rainDrops = Array.from({ length: isMobileViewport ? 42 : 58 }, () => {
      const drop = this.add.rectangle(0, 0, toRenderValue(2), toRenderValue(18), 0x9cdcff, 0).setDepth(8);
      drop.speed = Phaser.Math.Between(toRenderValue(520), toRenderValue(760));
      return drop;
    });
    this.resetWeather();
  }

  createBird() {
    const { width, height } = this.scale;
    this.bird = this.add.container(width * 0.32, height * 0.48);
    this.birdBody = this.add.ellipse(0, 0, toRenderValue(46), toRenderValue(36), 0xffffff);
    this.wing = this.add.triangle(
      toRenderValue(-4),
      toRenderValue(3),
      0,
      0,
      toRenderValue(-24),
      toRenderValue(15),
      toRenderValue(7),
      toRenderValue(24),
      0xffffff
    );
    this.scarf = this.add.rectangle(toRenderValue(-18), toRenderValue(-15), toRenderValue(22), toRenderValue(6), 0xffffff);
    const eye = this.add.circle(toRenderValue(14), toRenderValue(-7), toRenderValue(4), 0x0b1921);
    const beak = this.add.triangle(toRenderValue(28), 0, 0, 0, toRenderValue(18), toRenderValue(7), 0, toRenderValue(14), 0xf6d365);

    this.bird.add([this.scarf, this.wing, this.birdBody, beak, eye]);
    this.paintBird();
    this.createTrailPool();

    this.tweens.add({
      targets: this.wing,
      scaleY: 0.72,
      yoyo: true,
      repeat: -1,
      duration: 160,
      ease: "Sine.easeInOut"
    });
  }

  createTrailPool() {
    this.trailDots = Array.from({ length: 18 }, () => this.add.circle(0, 0, toRenderValue(4), 0xffffff, 0).setVisible(false));
  }

  clearTrailDots() {
    this.trailDots?.forEach((dot) => {
      dot.life = 0;
      dot.setVisible(false);
    });
  }

  createFloatingText() {
    this.levelText = this.add
      .text(this.scale.width / 2, toRenderValue(116), "", {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: `${toRenderValue(28)}px`,
        color: "#f6fbf7",
        stroke: "#0b1921",
        strokeThickness: toRenderValue(4)
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.rewardPopText = this.add
      .text(this.scale.width / 2, toRenderValue(154), "", {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: `${toRenderValue(16)}px`,
        color: "#f6d365",
        stroke: "#0b1921",
        strokeThickness: toRenderValue(3)
      })
      .setOrigin(0.5)
      .setAlpha(0);
  }

  bindInput() {
    this.input.on("pointerdown", (pointer) => {
      pointer.event?.preventDefault?.();
      this.tryFlap();
    });
  }

  tryFlap() {
    if (this.status === "playing") this.flap();
  }

  resetGame() {
    this.clearPipes();
    this.score = 0;
    this.levelIndex = 0;
    this.velocityY = 0;
    this.elapsed = 0;
    this.lastPipeAt = -400;
    this.shieldUntil = 0;
    this.slowUntil = 0;
    this.crashUntil = 0;
    this.flapLiftUntil = 0;
    this.lastFlapAt = 0;
    this.flapBoostUntil = 0;
    this.lastGapCenter = 0;
    this.flapPulseUntil = 0;
    this.nextTrailAt = 0;
    this.shieldStrokeActive = false;
    this.resetWeather();
    this.resetBirdVisuals();
    this.bird.setPosition(this.scale.width * 0.32, this.scale.height * 0.48);
    this.showLevelMessage(this.currentLevel(), true);
    this.applyTheme(0, true);
  }

  flap() {
    const level = this.currentLevel();
    const rapidTap = this.elapsed - this.lastFlapAt < 145;
    const fallingRecovery = this.velocityY > 0 ? Phaser.Math.Clamp(this.velocityY * 0.055, 0, toRenderValue(20)) : 0;
    this.velocityY = Math.max(toRenderValue(-370), level.flapVelocity - fallingRecovery - (rapidTap ? toRenderValue(2) : 0));
    this.bird.rotation = -0.44;
    this.flapLiftUntil = this.elapsed;
    this.flapBoostUntil = this.elapsed + 180;
    this.flapPulseUntil = this.elapsed + 86;
    this.lastFlapAt = this.elapsed;
  }

  spawnPipe(level) {
    const { width, height } = this.scale;
    const minTop = toRenderValue(94);
    const maxBottom = height - toRenderValue(122);
    const minCenter = minTop + level.pipeGap / 2;
    const maxCenter = maxBottom - level.pipeGap / 2;
    const previousCenter = this.lastGapCenter || Phaser.Math.Clamp(this.bird.y, minCenter, maxCenter);
    const step = level.maxStep ?? toRenderValue(80);
    const low = Math.max(minCenter, previousCenter - step);
    const high = Math.min(maxCenter, previousCenter + step);
    const gapCenter = Phaser.Math.Between(Math.round(low), Math.round(high));
    this.lastGapCenter = gapCenter;
    const pipeWidth = toRenderValue(70);
    const topHeight = gapCenter - level.pipeGap / 2;
    const bottomY = gapCenter + level.pipeGap / 2;
    const bottomHeight = height - bottomY - toRenderValue(64);
    const theme = this.currentTheme();
    const top = this.createGateSegment(width + pipeWidth, topHeight / 2, pipeWidth, topHeight, theme, true);
    const bottom = this.createGateSegment(width + pipeWidth, bottomY + bottomHeight / 2, pipeWidth, bottomHeight, theme, false);

    if (level.movingGates) {
      const offset = Phaser.Math.Between(toRenderValue(12), toRenderValue(32));
      this.tweens.add({
        targets: [top, bottom],
        y: `+=${offset}`,
        duration: Phaser.Math.Between(900, 1350),
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
      });
    }

    this.pipes.push({ top, bottom, scored: false });
  }

  createGateSegment(x, y, width, height, theme, isTop) {
    const segment = this.add.container(x, y);
    segment.setSize(width, height);
    segment.width = width;
    segment.height = height;

    const body = this.add.rectangle(0, 0, width, height, theme.gateA, 0.96);
    const inner = this.add.rectangle(0, 0, width - toRenderValue(16), Math.max(toRenderValue(12), height - toRenderValue(18)), theme.gateB, 0.24);
    const edge = this.add.rectangle(0, isTop ? height / 2 - toRenderValue(8) : -height / 2 + toRenderValue(8), width + toRenderValue(18), toRenderValue(16), theme.accent, 0.92);
    const stripe = this.add.rectangle(0, 0, toRenderValue(7), height, 0xffffff, 0.18);
    const cap = this.add.rectangle(0, isTop ? height / 2 + toRenderValue(3) : -height / 2 - toRenderValue(3), width + toRenderValue(26), toRenderValue(8), 0xffffff, 0.26);
    const leftRail = this.add.rectangle(-width / 2 + toRenderValue(8), 0, toRenderValue(5), height, 0x071216, 0.25);
    const rightRail = this.add.rectangle(width / 2 - toRenderValue(8), 0, toRenderValue(5), height, 0x071216, 0.25);

    body.setStrokeStyle(toRenderValue(3), 0xf6fbf7, 0.24);
    edge.setStrokeStyle(toRenderValue(2), 0x0b1921, 0.3);
    segment.add([body, inner, stripe, leftRail, rightRail, edge, cap]);

    const rivetCount = Math.max(2, Math.floor(height / toRenderValue(70)));
    for (let i = 0; i < rivetCount; i += 1) {
      const offset = -height / 2 + ((i + 1) * height) / (rivetCount + 1);
      segment.add(this.add.circle(-width / 2 + toRenderValue(18), offset, toRenderValue(4), 0xf6fbf7, 0.36));
      segment.add(this.add.circle(width / 2 - toRenderValue(18), offset, toRenderValue(4), 0xf6fbf7, 0.36));
    }

    return segment;
  }

  updatePipes(delta, pipeSpeed) {
    const birdBounds = this.getBirdBounds();

    for (let i = this.pipes.length - 1; i >= 0; i -= 1) {
      const pair = this.pipes[i];
      pair.top.x -= pipeSpeed * delta;
      pair.bottom.x -= pipeSpeed * delta;

      if (!pair.scored && pair.top.x + pair.top.width / 2 < this.bird.x - toRenderValue(20)) {
        pair.scored = true;
        this.addScore(1);
      }

      const hitTop = Phaser.Geom.Intersects.RectangleToRectangle(birdBounds, this.getSegmentBounds(pair.top));
      const hitBottom = Phaser.Geom.Intersects.RectangleToRectangle(birdBounds, this.getSegmentBounds(pair.bottom));
      if (hitTop || hitBottom) {
        if (this.elapsed > this.shieldUntil) {
          this.gameOver();
          return;
        }

        this.bounceFromPipe(pair, hitTop);
        return;
      }

      if (pair.top.x < toRenderValue(-90)) {
        pair.top.destroy();
        pair.bottom.destroy();
        this.pipes.splice(i, 1);
      }
    }
  }

  addScore(amount) {
    const previousLevelIndex = this.levelIndex;
    this.score += amount;
    this.levelIndex = getLevelForScore(this.score);

    if (this.score >= LEVELS[LEVELS.length - 1].targetScore) {
      this.completeGame();
      return;
    }

    if (this.levelIndex !== previousLevelIndex) {
      this.applyLevelReward(previousLevelIndex);
      this.levelIndex = getLevelForScore(this.score);
      this.applyTheme(this.levelIndex);
      this.showLevelMessage(this.currentLevel(), false);
    }

    this.unlockWeatherIfReady();
    this.emitHud();
  }

  applyLevelReward(completedLevelIndex) {
    const completedLevel = LEVELS[completedLevelIndex];
    const shieldMs = completedLevelIndex >= 8 ? 3300 : completedLevelIndex >= 6 ? 3000 : completedLevelIndex >= 3 ? 2500 : 2000;
    this.shieldUntil = this.elapsed + shieldMs;

    if ([1, 7].includes(completedLevelIndex)) this.slowUntil = this.elapsed + 3200;
    if (completedLevelIndex === 2) this.score += 1;
    if (completedLevelIndex === 5) this.score += 2;

    rewardTextEl.textContent = `完成「${completedLevel.name}」：${completedLevel.reward}`;
  }

  showLevelMessage(level, instant) {
    this.levelText.setText(`第 ${level.id} 关：${level.name}`);
    this.rewardPopText.setText(level.challenge);
    this.levelText.setPosition(this.scale.width / 2, toRenderValue(116));
    this.rewardPopText.setPosition(this.scale.width / 2, toRenderValue(154));

    if (instant) {
      this.levelText.setAlpha(1);
      this.rewardPopText.setAlpha(1);
    }

    this.tweens.killTweensOf([this.levelText, this.rewardPopText]);
    this.tweens.add({
      targets: [this.levelText, this.rewardPopText],
      alpha: 1,
      y: `-=${toRenderValue(8)}`,
      duration: 180,
      ease: "Sine.easeOut",
      onComplete: () => {
        this.tweens.add({
          targets: [this.levelText, this.rewardPopText],
          alpha: 0,
          delay: instant ? 1100 : 1500,
          duration: 360,
          ease: "Sine.easeIn"
        });
      }
    });
  }

  updateBirdEffects(delta) {
    const pulse = Phaser.Math.Clamp((this.flapPulseUntil - this.elapsed) / 86, 0, 1);
    const pulseEase = pulse * pulse;
    const blend = 1 - Math.pow(0.001, delta);
    this.bird.scaleX = Phaser.Math.Linear(this.bird.scaleX, 1 + pulseEase * 0.11, blend);
    this.bird.scaleY = Phaser.Math.Linear(this.bird.scaleY, 1 - pulseEase * 0.12, blend);
  }

  updateTrail(delta, pipeSpeed) {
    const skin = SKINS[selectedSkin];
    if (this.elapsed >= this.nextTrailAt) {
      const dot = this.trailDots[this.trailCursor];
      this.trailCursor = (this.trailCursor + 1) % this.trailDots.length;
      dot.life = 0.34;
      dot.maxLife = 0.34;
      dot.setPosition(this.bird.x - toRenderValue(24), this.bird.y + Phaser.Math.Between(toRenderValue(-9), toRenderValue(9)));
      dot.setFillStyle(skin.trail, 0.5);
      dot.setScale(1);
      dot.setAlpha(0.5);
      dot.setVisible(true);
      this.nextTrailAt = this.elapsed + 48;
    }

    for (const dot of this.trailDots) {
      if (!dot.visible) continue;
      dot.life -= delta;
      if (dot.life <= 0) {
        dot.setVisible(false);
        continue;
      }

      const progress = dot.life / dot.maxLife;
      dot.x -= pipeSpeed * delta * 0.48;
      dot.setAlpha(0.5 * progress);
      dot.setScale(0.25 + progress * 0.75);
    }

    const shieldActive = this.elapsed < this.shieldUntil;
    if (shieldActive !== this.shieldStrokeActive) {
      this.shieldStrokeActive = shieldActive;
      this.birdBody.setStrokeStyle(shieldActive ? 4 : 0, 0xf6d365, shieldActive ? 0.9 : 0);
    }
  }

  unlockWeatherIfReady() {
    if (this.weatherUnlocked || this.score < WEATHER_SCORE_THRESHOLD) return;

    this.weatherUnlocked = true;
    this.pickWeatherType();
    this.nextWeatherSwapAt = this.elapsed + Phaser.Math.Between(7000, 10000);
    this.nextLightningAt = this.elapsed + Phaser.Math.Between(700, 1600);
    this.showWeatherMessage();
  }

  pickWeatherType() {
    const next = Phaser.Utils.Array.GetRandom(WEATHER_TYPES);
    this.weatherType = next === this.weatherType ? Phaser.Utils.Array.GetRandom(WEATHER_TYPES) : next;
    this.weatherDim.setAlpha(this.weatherType === "thunderstorm" ? 0.24 : this.weatherType === "rain" ? 0.12 : 0.06);
  }

  showWeatherMessage() {
    const labels = {
      lightning: "闪电天气",
      rain: "暴雨天气",
      tornado: "龙卷风天气",
      thunderstorm: "雷暴天气"
    };
    this.rewardPopText.setText(`${labels[this.weatherType]}出现`);
    this.rewardPopText.setPosition(this.scale.width / 2, toRenderValue(154));
    this.tweens.killTweensOf(this.rewardPopText);
    this.rewardPopText.setAlpha(1);
    this.tweens.add({
      targets: this.rewardPopText,
      alpha: 0,
      delay: 1050,
      duration: 360,
      ease: "Sine.easeIn"
    });
  }

  resetWeather() {
    this.weatherUnlocked = false;
    this.weatherType = "clear";
    this.nextWeatherSwapAt = 0;
    this.nextLightningAt = 0;
    this.lightningUntil = 0;
    this.tornadoPhase = 0;
    this.weatherDim?.setAlpha(0);
    this.weatherGraphics?.clear();
    this.lightningGraphics?.clear();
    this.rainDrops?.forEach((drop) => {
      drop.setAlpha(0);
      drop.setPosition(Phaser.Math.Between(0, this.scale.width), Phaser.Math.Between(-this.scale.height, 0));
    });
  }

  updateWeather(delta, pipeSpeed) {
    if (!this.weatherUnlocked) return;

    if (this.elapsed >= this.nextWeatherSwapAt) {
      this.pickWeatherType();
      this.nextWeatherSwapAt = this.elapsed + Phaser.Math.Between(7000, 10500);
      this.showWeatherMessage();
    }

    const hasRain = this.weatherType === "rain" || this.weatherType === "thunderstorm";
    const hasLightning = this.weatherType === "lightning" || this.weatherType === "thunderstorm";
    const hasTornado = this.weatherType === "tornado";

    this.updateRain(delta, pipeSpeed, hasRain);
    this.updateLightning(hasLightning);
    this.updateTornado(delta, hasTornado);
  }

  updateRain(delta, pipeSpeed, active) {
    const alpha = active ? (this.weatherType === "thunderstorm" ? 0.58 : 0.42) : 0;
    for (const drop of this.rainDrops) {
      drop.setAlpha(alpha);
      if (!active) continue;

      drop.x -= (pipeSpeed * 0.18 + toRenderValue(190)) * delta;
      drop.y += drop.speed * delta;
      drop.rotation = -0.28;

      if (drop.y > this.scale.height + toRenderValue(28) || drop.x < toRenderValue(-24)) {
        drop.setPosition(Phaser.Math.Between(0, this.scale.width + toRenderValue(80)), Phaser.Math.Between(toRenderValue(-120), toRenderValue(-12)));
      }
    }
  }

  updateLightning(active) {
    if (!active) {
      this.lightningGraphics.clear();
      return;
    }

    if (this.elapsed >= this.nextLightningAt) {
      this.lightningUntil = this.elapsed + Phaser.Math.Between(80, 130);
      this.nextLightningAt = this.elapsed + Phaser.Math.Between(1400, 3100);
      this.cameras.main.flash(110, 218, 236, 255, false);
    }

    this.lightningGraphics.clear();
    if (this.elapsed > this.lightningUntil) return;

    const startX = Phaser.Math.Between(toRenderValue(80), this.scale.width - toRenderValue(80));
    const segments = 6;
    this.lightningGraphics.lineStyle(toRenderValue(3), 0xeaf7ff, 0.92);
    this.lightningGraphics.beginPath();
    this.lightningGraphics.moveTo(startX, 0);
    for (let i = 1; i <= segments; i += 1) {
      const x = startX + Phaser.Math.Between(toRenderValue(-34), toRenderValue(34));
      const y = (this.scale.height * 0.62 * i) / segments;
      this.lightningGraphics.lineTo(x, y);
    }
    this.lightningGraphics.strokePath();
  }

  updateTornado(delta, active) {
    this.weatherGraphics.clear();
    if (!active) return;

    this.tornadoPhase += delta * 4.6;
    const baseX = this.scale.width * 0.72 + Math.sin(this.tornadoPhase * 0.55) * toRenderValue(42);
    const baseY = this.scale.height - toRenderValue(96);
    this.weatherGraphics.lineStyle(toRenderValue(3), 0xd7f5ff, 0.46);
    for (let i = 0; i < 7; i += 1) {
      const t = i / 6;
      const y = baseY - t * toRenderValue(210);
      const width = toRenderValue(26 + t * 88 + Math.sin(this.tornadoPhase + i) * 9);
      const x = baseX + Math.sin(this.tornadoPhase + i * 0.75) * toRenderValue(12);
      this.weatherGraphics.strokeEllipse(x, y, width, toRenderValue(13 + t * 12));
    }
  }

  checkBounds() {
    if (this.bird.y < toRenderValue(34) || this.bird.y > this.scale.height - toRenderValue(74)) {
      if (this.elapsed > this.shieldUntil) {
        this.gameOver();
      } else {
        this.bird.y = Phaser.Math.Clamp(this.bird.y, toRenderValue(38), this.scale.height - toRenderValue(80));
        this.velocityY *= -0.25;
      }
    }
  }

  gameOver() {
    if (this.status === "gameover") return;

    this.status = "gameover";
    this.cameras.main.shake(180, 0.008);
    this.tweens.killTweensOf(this.bird);
    this.tweens.add({
      targets: this.bird,
      alpha: 0.28,
      scale: 0.92,
      duration: 180,
      ease: "Sine.easeIn"
    });
    setStatusCopy(this.status);
    this.emitHud();
  }

  completeGame() {
    this.status = "complete";
    rewardTextEl.textContent = "通关完成：获得天穹完赛徽章";
    setStatusCopy(this.status);
    this.emitHud();
  }

  emitHud() {
    const level = this.currentLevel();
    const previousTarget = getPreviousTarget(this.levelIndex);
    const span = level.targetScore - previousTarget;
    const progress = Phaser.Math.Clamp((this.score - previousTarget) / span, 0, 1);
    updateHud({
      score: this.score,
      levelIndex: this.levelIndex,
      progress,
      challenge: level.challenge,
      reward: level.reward
    });
  }

  currentLevel() {
    return scaleLevel(LEVELS[this.levelIndex]);
  }

  currentTheme() {
    return THEMES[Math.min(THEMES.length - 1, Math.floor(this.levelIndex / 2))];
  }

  applyTheme(levelIndex, instant = false) {
    const themeIndex = Math.min(THEMES.length - 1, Math.floor(levelIndex / 2));
    if (this.currentThemeIndex === themeIndex && !instant) return;

    this.currentThemeIndex = themeIndex;
    const theme = THEMES[themeIndex];
    const width = this.scale.width;
    const height = this.scale.height;

    this.themeGraphics.clear();
    this.themeGraphics.fillGradientStyle(theme.top, theme.top, theme.bottom, theme.bottom, 1);
    this.themeGraphics.fillRect(0, 0, width, height);

    this.cameras.main.setBackgroundColor(theme.bottom);
    this.ground.setTint(theme.ground);
    this.stars.children.each((star) => {
      star.setFillStyle(theme.star, Phaser.Math.FloatBetween(0.22, 0.68));
      return true;
    });

    if (!instant) {
      this.cameras.main.flash(260, (theme.haze >> 16) & 255, (theme.haze >> 8) & 255, theme.haze & 255, false);
    }
  }

  paintBird() {
    if (!this.birdBody || !this.wing || !this.scarf) return;
    const skin = SKINS[selectedSkin];
    this.birdBody.setFillStyle(skin.body);
    this.wing.setFillStyle(skin.wing);
    this.scarf.setFillStyle(skin.bodyDark);
  }

  resetBirdVisuals() {
    this.tweens.killTweensOf(this.bird);
    this.flapPulseUntil = 0;
    this.clearTrailDots();
    this.bird.setAlpha(1);
    this.bird.setScale(1);
    this.bird.setRotation(0);
    this.birdBody.setStrokeStyle(0, 0xf6d365, 0);
    this.paintBird();
  }

  bounceFromPipe(pair, hitTop) {
    if (this.elapsed < this.crashUntil) return;

    this.crashUntil = this.elapsed + 420;
    const pushBack = Math.max(toRenderValue(48), pair.top.width * 0.75);
    this.bird.x = Math.max(toRenderValue(42), pair.top.x - pushBack);
    this.velocityY = hitTop ? toRenderValue(230) : toRenderValue(-260);
    this.cameras.main.shake(90, 0.003);

    this.tweens.add({
      targets: this.bird,
      scaleX: 0.92,
      scaleY: 1.08,
      duration: 80,
      yoyo: true,
      ease: "Sine.easeOut"
    });
  }

  getBirdBounds() {
    return new Phaser.Geom.Rectangle(this.bird.x - toRenderValue(19), this.bird.y - toRenderValue(15), toRenderValue(38), toRenderValue(30));
  }

  getSegmentBounds(segment) {
    return new Phaser.Geom.Rectangle(segment.x - segment.width / 2, segment.y - segment.height / 2, segment.width, segment.height);
  }

  clearPipes() {
    this.pipes.forEach((pair) => {
      pair.top.destroy();
      pair.bottom.destroy();
    });
    this.pipes = [];
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: gameWidth,
  height: gameHeight,
  backgroundColor: "#0b1921",
  fps: {
    target: 60,
    forceSetTimeOut: false
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false
  },
  scene: [FlappyQuestScene]
});

const syncCanvasViewportSize = () => {
  const canvas = game.canvas;
  if (!canvas) return;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
};

syncCanvasViewportSize();
window.addEventListener("resize", syncCanvasViewportSize, { passive: true });

const getScene = () => scene || game.scene.getScene("FlappyQuestScene");

window.addEventListener(
  "keydown",
  (event) => {
    if (event.code !== "Space") return;
    const current = getScene();
    if (current?.status !== "playing") return;

    event.preventDefault();
    event.stopPropagation();
    current.flap();
  },
  { capture: true, passive: false }
);

startButton.addEventListener("click", () => {
  getScene().setSkin(selectedSkin);
  getScene().startGame();
});

restartButton.addEventListener("click", () => {
  getScene().setSkin(selectedSkin);
  getScene().restartGame();
});

homeButton.addEventListener("click", () => {
  getScene().returnToMenu();
});

pauseButton.addEventListener("click", () => {
  getScene().togglePause();
});

skinButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSkin = button.dataset.skin;
    skinButtons.forEach((item) => item.classList.toggle("active", item === button));
    getScene().setSkin(selectedSkin);
  });
});

setStatusCopy("menu");
