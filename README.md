# annict-tracker

annict-tracker は Annict の視聴記録を便利にする Web アプリケーションです。(鋭意開発中...)

## Gallery

<img width="696" alt="image" src="https://user-images.githubusercontent.com/7302150/197771681-2d0f0e53-4f15-493e-8025-b8d3fc0b2328.png">

<img width="1024" alt="image" src="https://user-images.githubusercontent.com/7302150/197772434-c646a93a-6883-4eed-bda0-386a261aeff3.png">

<img width="966" alt="image" src="https://user-images.githubusercontent.com/7302150/197772831-bd61938b-e627-46e5-b84b-34d1ce86b022.png">

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
