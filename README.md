# annict-tracker

[![Check](https://github.com/SlashNephy/annict-tracker/actions/workflows/check-node.yml/badge.svg)](https://github.com/SlashNephy/annict-tracker/actions/workflows/check-node.yml)
[![Build Image](https://github.com/SlashNephy/annict-tracker/actions/workflows/build-image.yml/badge.svg)](https://github.com/SlashNephy/annict-tracker/actions/workflows/build-image.yml)

annict-tracker は Annict の視聴記録を便利にする Web アプリケーションです。

https://annict-tracker.vercel.app で公開しています。

## Features

✨

## Gallery

<img width="679" alt="disclaimer" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/4577cea6-66d1-41c4-a5f7-eb75e60ce140">

<img width="1799" alt="main view" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/219b7c8b-c2dd-40c7-80e3-11376256f36c">

<img width="1318" alt="controls" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/8eb193ae-5b72-4229-a815-db65e0ae91ed">

<img width="967" alt="settings" src="https://github.com/SlashNephy/annict-tracker/assets/7302150/a1f0d1ae-dbf3-404d-bfec-5f343d18f613">

## Get Started

### 環境変数

実行にはいくつか環境変数が必要です。`.env.example` をもとに `.env` を作成してください。

- `NEXTAUTH_URL`
  - アプリがデプロイされる URL を指定します。例えば、ローカル起動の場合は `http://localhost:3000` としてください。
- `NEXTAUTH_SECRET`
  - Cookie のシークレットです。本番環境では必須です。https://next-auth.js.org/configuration/options#secret
- `ANNICT_CLIENT_ID`, `ANNICT_CLIENT_SECRET`
  - Annict の OAuth 2 クライアント ID 及びシークレットです。https://annict.com/oauth/applications/new で発行できます。

### ローカル起動

`vercel dev` コマンドは使用できません。([Stack Overflow](https://stackoverflow.com/a/73858666))

```console
$ yarn dev
```

### デプロイ

Vercel にデプロイする場合は上記の環境変数をダッシュボードから追加する必要があります。

```console
$ vercel
```

### Docker

Docker イメージは [ghcr.io/slashnephy/annict-tracker](https://github.com/SlashNephy/annict-tracker/pkgs/container/annict-tracker) で公開されています。
