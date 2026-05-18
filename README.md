# Flappy Quest

一个 Phaser 2D 网页小游戏。玩法参考 Flappy Bird 的点击上升节奏，加入 10 关渐进难度、奖励机制和 3 套默认开放皮肤。

## 本地运行

这个项目是静态网页，不需要安装 npm 依赖。

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173
```

## 验证

```bash
node scripts/verify-static-app.mjs
```

如果本机没有全局 `node`，可以用 Codex bundled Node：

```bash
/Applications/Codex.app/Contents/Resources/node scripts/verify-static-app.mjs
```

## 部署到 Vercel

推荐使用 GitHub + Vercel Git Integration：

1. 把仓库推送到 GitHub。
2. 在 Vercel 选择 `Add New Project`。
3. 导入这个 GitHub 仓库。
4. Framework 选择 `Other`。
5. Build Command 使用默认的 `npm run build`。
6. Output Directory 留空。构建脚本会生成 Vercel Build Output。
7. 点击 Deploy。

## 迭代流程

```text
本地修改
→ 本地打开 127.0.0.1:4173 测试
→ 运行验证脚本
→ git commit
→ git push
→ Vercel 自动生成 Preview/Production 部署
```

版本记录见 [CHANGELOG.md](./CHANGELOG.md)。
