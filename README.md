# annict-tracker

annict-tracker は Annict の視聴記録を便利にする Web アプリケーションです。(鋭意開発中...)

## Gallery

<img width="645" alt="image" src="https://user-images.githubusercontent.com/7302150/194802597-f9b0a1f4-9964-4e9c-8765-b0013491ca56.png">

<img width="1800" alt="image" src="https://user-images.githubusercontent.com/7302150/194802526-4cb9c483-e4b6-4f9f-a578-99aa0430b6ee.png">

## Get Started

### 環境変数

実行にはいくつか環境変数が必要です。`.env.example` をもとに `.env` を作成してください。

- `NEXTAUTH_URL`
  - アプリがデプロイされる URL を指定します。例えば、ローカル起動の場合は `http://localhost:3000` としてください。
- `NEXTAUTH_SECRET`
  - Cookie のシークレットです。本番環境では必須です。https://next-auth.js.org/configuration/options#secret
- `ANNICT_CLIENT_ID`, `ANNICT_CLIENT_SECRET`
  - Annict の OAuth 2 クライアント ID 及びシークレットです。https://annict.com/oauth/applications/new で発行できます。
- `ANNICT_ACCESS_TOKEN`
  - IntelliJ の GraphQL プラグインで Annict GraphQL API を使用する際は必要です。

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
