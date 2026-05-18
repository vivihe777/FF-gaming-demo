const LEVELS = [
  { id: 1, name: "晨风港", targetScore: 5, pipeSpeed: 205, pipeGap: 190, pipeInterval: 1500, gravity: 1220, fallGravity: 1680, maxFallSpeed: 760, flapVelocity: -245, windPush: 0, movingGates: false, challenge: "穿过 5 道宽风门", reward: "2 秒护盾" },
  { id: 2, name: "绿塔航线", targetScore: 10, pipeSpeed: 225, pipeGap: 178, pipeInterval: 1430, gravity: 1250, fallGravity: 1760, maxFallSpeed: 790, flapVelocity: -250, windPush: 0, movingGates: false, challenge: "风门略窄，保持节奏", reward: "下一关开局减速" },
  { id: 3, name: "斜阳峡", targetScore: 15, pipeSpeed: 245, pipeGap: 166, pipeInterval: 1370, gravity: 1280, fallGravity: 1850, maxFallSpeed: 824, flapVelocity: -255, windPush: 0, movingGates: false, challenge: "速度提升，连续穿越", reward: "额外 1 分" },
  { id: 4, name: "逆流湾", targetScore: 20, pipeSpeed: 265, pipeGap: 158, pipeInterval: 1320, gravity: 1310, fallGravity: 1950, maxFallSpeed: 860, flapVelocity: -260, windPush: -18, movingGates: false, challenge: "逆风轻推，提前修正高度", reward: "2.5 秒护盾" },
  { id: 5, name: "星桥", targetScore: 25, pipeSpeed: 285, pipeGap: 150, pipeInterval: 1260, gravity: 1340, fallGravity: 2060, maxFallSpeed: 898, flapVelocity: -265, windPush: 0, movingGates: true, challenge: "部分风门上下浮动", reward: "稳定翼，下一关重力降低" },
  { id: 6, name: "雾岭", targetScore: 30, pipeSpeed: 305, pipeGap: 142, pipeInterval: 1210, gravity: 1370, fallGravity: 2180, maxFallSpeed: 938, flapVelocity: -270, windPush: 22, movingGates: true, challenge: "顺风扰动，门距继续收紧", reward: "额外 2 分" },
  { id: 7, name: "高压航道", targetScore: 35, pipeSpeed: 325, pipeGap: 135, pipeInterval: 1160, gravity: 1410, fallGravity: 2310, maxFallSpeed: 980, flapVelocity: -275, windPush: 0, movingGates: true, challenge: "高速浮动风门", reward: "3 秒护盾" },
  { id: 8, name: "晶脉裂谷", targetScore: 40, pipeSpeed: 345, pipeGap: 128, pipeInterval: 1110, gravity: 1450, fallGravity: 2450, maxFallSpeed: 1024, flapVelocity: -280, windPush: -26, movingGates: true, challenge: "高速逆风，容错降低", reward: "下一关开局减速" },
  { id: 9, name: "雷鸣门", targetScore: 45, pipeSpeed: 365, pipeGap: 122, pipeInterval: 1060, gravity: 1490, fallGravity: 2600, maxFallSpeed: 1072, flapVelocity: -285, windPush: 28, movingGates: true, challenge: "强风与窄门同时出现", reward: "最终关额外护盾" },
  { id: 10, name: "天穹终点", targetScore: 52, pipeSpeed: 390, pipeGap: 116, pipeInterval: 1000, gravity: 1530, fallGravity: 2760, maxFallSpeed: 1124, flapVelocity: -290, windPush: 0, movingGates: true, challenge: "最快、最窄、浮动最多", reward: "天穹完赛徽章" }
];

const THEMES = [
  { name: "晨风港", top: 0x163944, bottom: 0x0b1b22, haze: 0x70d4b7, star: 0xf6fbf7, cloud: 0xd8f4ef, gateA: 0x67d8b1, gateB: 0x4ca6d8, ground: 0x20302b, accent: 0xf6d365 },
  { name: "斜阳峡", top: 0x402a3d, bottom: 0x171725, haze: 0xff9d76, star: 0xffe2ad, cloud: 0xffc18a, gateA: 0xffb45e, gateB: 0xd85f71, ground: 0x302421, accent: 0xffdf79 },
  { name: "星桥", top: 0x172046, bottom: 0x0b1024, haze: 0x7d74ff, star: 0xe8edff, cloud: 0xb7c7ff, gateA: 0x8b7dff, gateB: 0x4fd0ff, ground: 0x1b2444, accent: 0xd9e4ff },
  { name: "晶脉裂谷", top: 0x1b1734, bottom: 0x08151f, haze: 0x8ee5c0, star: 0xd9fff0, cloud: 0x66a6b5, gateA: 0x52e3c2, gateB: 0x8768ff, ground: 0x172a31, accent: 0xfff09b },
  { name: "雷鸣天穹", top: 0x241326, bottom: 0x08080f, haze: 0xffe15c, star: 0xffffff, cloud: 0x817f9a, gateA: 0xffd45c, gateB: 0xff4f7e, ground: 0x2a1d2d, accent: 0xffffff }
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
const skinButtons = [...document.querySelectorAll(".skin-option")];

let selectedSkin = "aurora";
let scene;

const getLevelForScore = (score) => {
  const index = LEVELS.findIndex((level) => score < level.targetScore);
  return index === -1 ? LEVELS.length - 1 : index;
};

const getPreviousTarget = (levelIndex) => (levelIndex === 0 ? 0 : LEVELS[levelIndex - 1].targetScore);

const setMenuVisible = (visible) => {
  menuEl.classList.toggle("hidden", !visible);
};

const setStatusCopy = (status) => {
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
    this.velocityY = Phaser.Math.Clamp(this.velocityY, -430, level.maxFallSpeed);
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
    this.updateTrail();
    this.updateClouds(delta, pipeSpeed);
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
          Phaser.Math.Between(35, height - 110),
          Phaser.Math.FloatBetween(0.8, 2.2),
          0xf6fbf7,
          Phaser.Math.FloatBetween(0.18, 0.55)
        )
      );
    }

    this.clouds = this.add.group();
    for (let i = 0; i < 9; i += 1) {
      const cloud = this.add.ellipse(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(90, Math.max(110, height - 180)),
        Phaser.Math.Between(70, 150),
        Phaser.Math.Between(20, 42),
        0xffffff,
        Phaser.Math.FloatBetween(0.08, 0.16)
      );
      this.clouds.add(cloud);
    }

    this.ground = this.add.tileSprite(width / 2, height - 32, width, 64, "__DEFAULT");
    this.ground.setTint(0x20302b);
    this.ground.setAlpha(0.95);
    this.createThemeLayers();
  }

  createThemeLayers() {
    this.themeGraphics = this.add.graphics().setDepth(-20);
    this.haze = this.add.ellipse(this.scale.width * 0.5, this.scale.height * 0.45, this.scale.width * 0.86, this.scale.height * 0.58, 0xffffff, 0.07).setDepth(-19);
    this.currentThemeIndex = -1;
    this.applyTheme(0, true);
  }

  createBird() {
    const { width, height } = this.scale;
    this.bird = this.add.container(width * 0.32, height * 0.48);
    this.birdBody = this.add.ellipse(0, 0, 46, 36, 0xffffff);
    this.wing = this.add.triangle(-4, 3, 0, 0, -24, 15, 7, 24, 0xffffff);
    this.scarf = this.add.rectangle(-18, -15, 22, 6, 0xffffff);
    const eye = this.add.circle(14, -7, 4, 0x0b1921);
    const beak = this.add.triangle(28, 0, 0, 0, 18, 7, 0, 14, 0xf6d365);

    this.bird.add([this.scarf, this.wing, this.birdBody, beak, eye]);
    this.paintBird();

    this.tweens.add({
      targets: this.wing,
      scaleY: 0.72,
      yoyo: true,
      repeat: -1,
      duration: 160,
      ease: "Sine.easeInOut"
    });
  }

  createFloatingText() {
    this.levelText = this.add
      .text(this.scale.width / 2, 116, "", {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "28px",
        color: "#f6fbf7",
        stroke: "#0b1921",
        strokeThickness: 4
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.rewardPopText = this.add
      .text(this.scale.width / 2, 154, "", {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "16px",
        color: "#f6d365",
        stroke: "#0b1921",
        strokeThickness: 3
      })
      .setOrigin(0.5)
      .setAlpha(0);
  }

  bindInput() {
    this.input.on("pointerdown", () => {
      if (this.status === "playing") this.flap();
    });
    this.input.keyboard?.on("keydown-SPACE", () => {
      if (this.status === "playing") this.flap();
    });
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
    this.resetBirdVisuals();
    this.bird.setPosition(this.scale.width * 0.32, this.scale.height * 0.48);
    this.showLevelMessage(this.currentLevel(), true);
    this.applyTheme(0, true);
  }

  flap() {
    const level = this.currentLevel();
    const rapidTap = this.elapsed - this.lastFlapAt < 145;
    const fallingRecovery = this.velocityY > 0 ? Phaser.Math.Clamp(this.velocityY * 0.055, 0, 20) : 0;
    this.velocityY = Math.max(-330, level.flapVelocity - fallingRecovery - (rapidTap ? 2 : 0));
    this.bird.rotation = -0.44;
    this.flapLiftUntil = this.elapsed;
    this.flapBoostUntil = this.elapsed + 180;
    this.lastFlapAt = this.elapsed;
    this.tweens.killTweensOf(this.bird);
    this.tweens.add({
      targets: this.bird,
      scaleX: 1.13,
      scaleY: 0.86,
      yoyo: true,
      duration: 58,
      ease: "Quad.easeOut"
    });
    this.tweens.add({
      targets: this.wing,
      scaleY: 0.46,
      yoyo: true,
      duration: 58,
      ease: "Quad.easeOut"
    });
  }

  spawnPipe(level) {
    const { width, height } = this.scale;
    const minTop = 94;
    const maxBottom = height - 122;
    const gapCenter = Phaser.Math.Between(minTop + level.pipeGap / 2, maxBottom - level.pipeGap / 2);
    const pipeWidth = 70;
    const topHeight = gapCenter - level.pipeGap / 2;
    const bottomY = gapCenter + level.pipeGap / 2;
    const bottomHeight = height - bottomY - 64;
    const theme = this.currentTheme();
    const top = this.createGateSegment(width + pipeWidth, topHeight / 2, pipeWidth, topHeight, theme, true);
    const bottom = this.createGateSegment(width + pipeWidth, bottomY + bottomHeight / 2, pipeWidth, bottomHeight, theme, false);

    if (level.movingGates) {
      const offset = Phaser.Math.Between(12, 32);
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
    const inner = this.add.rectangle(0, 0, width - 16, Math.max(12, height - 18), theme.gateB, 0.24);
    const edge = this.add.rectangle(0, isTop ? height / 2 - 8 : -height / 2 + 8, width + 18, 16, theme.accent, 0.92);
    const stripe = this.add.rectangle(0, 0, 7, height, 0xffffff, 0.18);
    const cap = this.add.rectangle(0, isTop ? height / 2 + 3 : -height / 2 - 3, width + 26, 8, 0xffffff, 0.26);
    const leftRail = this.add.rectangle(-width / 2 + 8, 0, 5, height, 0x071216, 0.25);
    const rightRail = this.add.rectangle(width / 2 - 8, 0, 5, height, 0x071216, 0.25);

    body.setStrokeStyle(3, 0xf6fbf7, 0.24);
    edge.setStrokeStyle(2, 0x0b1921, 0.3);
    segment.add([body, inner, stripe, leftRail, rightRail, edge, cap]);

    const rivetCount = Math.max(2, Math.floor(height / 70));
    for (let i = 0; i < rivetCount; i += 1) {
      const offset = -height / 2 + ((i + 1) * height) / (rivetCount + 1);
      segment.add(this.add.circle(-width / 2 + 18, offset, 4, 0xf6fbf7, 0.36));
      segment.add(this.add.circle(width / 2 - 18, offset, 4, 0xf6fbf7, 0.36));
    }

    return segment;
  }

  updatePipes(delta, pipeSpeed) {
    const birdBounds = this.getBirdBounds();

    for (let i = this.pipes.length - 1; i >= 0; i -= 1) {
      const pair = this.pipes[i];
      pair.top.x -= pipeSpeed * delta;
      pair.bottom.x -= pipeSpeed * delta;

      if (!pair.scored && pair.top.x + pair.top.width / 2 < this.bird.x - 20) {
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

      if (pair.top.x < -90) {
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
    this.levelText.setPosition(this.scale.width / 2, 116);
    this.rewardPopText.setPosition(this.scale.width / 2, 154);

    if (instant) {
      this.levelText.setAlpha(1);
      this.rewardPopText.setAlpha(1);
    }

    this.tweens.killTweensOf([this.levelText, this.rewardPopText]);
    this.tweens.add({
      targets: [this.levelText, this.rewardPopText],
      alpha: 1,
      y: "-=8",
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

  updateTrail() {
    const skin = SKINS[selectedSkin];
    const dot = this.add.circle(this.bird.x - 24, this.bird.y + Phaser.Math.Between(-9, 9), 4, skin.trail, 0.5);
    this.tweens.add({
      targets: dot,
      x: dot.x - 42,
      alpha: 0,
      scale: 0.2,
      duration: 360,
      ease: "Sine.easeOut",
      onComplete: () => dot.destroy()
    });

    const shieldActive = this.elapsed < this.shieldUntil;
    this.birdBody.setStrokeStyle(shieldActive ? 4 : 0, 0xf6d365, shieldActive ? 0.9 : 0);
  }

  updateClouds(delta, pipeSpeed) {
    this.clouds.children.each((cloud) => {
      cloud.x -= pipeSpeed * delta * 0.12;
      if (cloud.x < -100) {
        cloud.x = this.scale.width + 120;
        cloud.y = Phaser.Math.Between(90, Math.max(110, this.scale.height - 180));
      }
      return true;
    });
  }

  checkBounds() {
    if (this.bird.y < 34 || this.bird.y > this.scale.height - 74) {
      if (this.elapsed > this.shieldUntil) {
        this.gameOver();
      } else {
        this.bird.y = Phaser.Math.Clamp(this.bird.y, 38, this.scale.height - 80);
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
    return LEVELS[this.levelIndex];
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
    this.themeGraphics.lineStyle(1, theme.haze, 0.12);
    for (let i = 0; i < 7; i += 1) {
      const y = height * (0.22 + i * 0.09);
      this.themeGraphics.beginPath();
      this.themeGraphics.moveTo(0, y);
      this.themeGraphics.lineTo(width, y + Math.sin(i) * 22);
      this.themeGraphics.strokePath();
    }

    this.cameras.main.setBackgroundColor(theme.bottom);
    this.haze.setFillStyle(theme.haze, 0.08);
    this.ground.setTint(theme.ground);
    this.stars.children.each((star) => {
      star.setFillStyle(theme.star, Phaser.Math.FloatBetween(0.22, 0.68));
      return true;
    });
    this.clouds.children.each((cloud) => {
      cloud.setFillStyle(theme.cloud, Phaser.Math.FloatBetween(0.08, 0.18));
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
    this.bird.setAlpha(1);
    this.bird.setScale(1);
    this.bird.setRotation(0);
    this.birdBody.setStrokeStyle(0, 0xf6d365, 0);
    this.paintBird();
  }

  bounceFromPipe(pair, hitTop) {
    if (this.elapsed < this.crashUntil) return;

    this.crashUntil = this.elapsed + 420;
    const pushBack = Math.max(48, pair.top.width * 0.75);
    this.bird.x = Math.max(42, pair.top.x - pushBack);
    this.velocityY = hitTop ? 230 : -260;
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
    return new Phaser.Geom.Rectangle(this.bird.x - 19, this.bird.y - 15, 38, 30);
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
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#0b1921",
  fps: {
    target: 60,
    forceSetTimeOut: false
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false
  },
  scene: [FlappyQuestScene]
});

const getScene = () => scene || game.scene.getScene("FlappyQuestScene");

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
