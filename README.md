# annict-tracker

[![Check](https://github.com/SlashNephy/annict-tracker/actions/workflows/check-node.yml/badge.svg)](https://github.com/SlashNephy/annict-tracker/actions/workflows/check-node.yml)

annict-tracker は Annict の視聴記録を便利にする Web アプリケーションです。

<https://annict-tracker.pages.dev> で公開しています。

## Gallery

<img width="679" alt="disclaimer" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/4577cea6-66d1-41c4-a5f7-eb75e60ce140">

<img width="1799" alt="main view" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/219b7c8b-c2dd-40c7-80e3-11376256f36c">

<img width="1318" alt="controls" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/8eb193ae-5b72-4229-a815-db65e0ae91ed">

<img width="967" alt="settings" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/a1f0d1ae-dbf3-404d-bfec-5f343d18f613">

## Get Started

annict-tracker は、Cloudflare Pages にデプロイする構成になっています。

```
annict-tracker
  ├ pages/
  │  └ Cloudflare Pages [Vite + Mantine]
  ├ functions/
  │  └ Cloudflare Worker [@auth/core]
  ...
```

### 環境変数

ローカル実行にはいくつか環境変数が必要です。`.dev.vars.example` をもとに `.dev.vars` を作成してください。

- `AUTH_SECRET`
  - Cookie のシークレットです。
  - 生成方法などは <https://authjs.dev/getting-started/oauth-tutorial#adding-environment-variables> を参照してください。
- `ANNICT_CLIENT_ID`, `ANNICT_CLIENT_SECRET`
  - Annict の OAuth 2 クライアント ID 及びシークレットです。
  - <https://annict.com/oauth/applications/new> で発行できます。
    - リダイレクト URI には次の値を入力してください。
      - `http://127.0.0.1:8788/api/auth/callback/annict`
    - `read write` (読み込み + 書き込み) スコープが必要です。

### ローカル実行

```console
pnpm dev
```

### ビルド

```console
pnpm build
```

### デプロイ

```console
pnpm deploy
```

- [Deploy a Vite 3 site · Cloudflare Pages docs](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/) を参照してください。
- 環境変数を設定してください。
- Annict の OAuth 2 クライアントのリダイレクト URI を適切に変更してください。
  - 例えば、`https://xxx.pages.dev` にデプロイしたなら
    - `https://xxx.pages.dev/api/auth/callback/annict` が正しい URI です。
  - ローカル実行に使用するクライアントと分けることをおすすめします。
