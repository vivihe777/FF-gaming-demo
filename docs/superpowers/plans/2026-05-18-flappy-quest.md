# Flappy Quest Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a small Phaser browser game inspired by Flappy Bird, with click/tap interaction, 10 progressively harder levels, rewards, and 3 always-available skins.

**Architecture:** A Vite + TypeScript app hosts a Phaser canvas with a DOM HUD/menu overlay. Game rules live in small TypeScript modules for level configuration, skin configuration, and gameplay constants; the Phaser scene owns rendering, input, physics, and state transitions.

**Tech Stack:** Vite, TypeScript, Phaser 3, CSS DOM overlays.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/styles.css`

- [x] Create a Vite TypeScript project scaffold with Phaser as the runtime dependency.

### Task 2: Game Data

**Files:**
- Create: `src/game/levels.ts`
- Create: `src/game/skins.ts`
- Create: `src/game/types.ts`

- [x] Define 10 levels with progressive speed, obstacle gap, obstacle spacing, challenge text, and reward text.
- [x] Define 3 always-available skins with different colors and trail effects.

### Task 3: Gameplay Scene

**Files:**
- Create: `src/game/FlappyQuestScene.ts`

- [x] Implement boot/start/playing/game-over/win states.
- [x] Implement click, tap, and spacebar flap input.
- [x] Implement obstacle spawning, scoring, level progression, rewards, and collision.
- [x] Keep animation smooth with Phaser tweens, particle-like trail dots, stable physics, and resize handling.

### Task 4: HUD And Styling

**Files:**
- Modify: `src/main.ts`
- Modify: `src/styles.css`

- [x] Add DOM buttons for start, restart, pause/resume, and skin selection.
- [x] Add HUD display for score, level, challenge, reward, and next-level progress.
- [x] Ensure desktop/mobile readability without blocking the playfield.

### Task 5: Verification

**Files:**
- Verify generated app

- [x] Run dependency install.
- [x] Run production build.
- [x] Run dev server.
- [x] Open in browser and verify first playable screen, flap interaction, collision/restart, and responsive layout.
