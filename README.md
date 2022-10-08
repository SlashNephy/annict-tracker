# annict-tracker

## Get Started

### 環境変数

実行にはいくつか環境変数が必要です。Vercel を使用する場合はダッシュボードから追加できます。

- `NEXTAUTH_URL`
  - アプリがデプロイされる URL を指定します。例えば、ローカル起動の場合は `http://localhost:3000` としてください。
- `ANNICT_CLIENT_ID`, `ANNICT_CLIENT_SECRET`
  - Annict の OAuth 2 クライアント ID 及びシークレットです。https://annict.com/oauth/applications/new で発行できます。

Vercel で設定した場合は以下のコマンドでローカルに環境変数を pull できます。

```console
$ vercel pull
```

### ローカル起動

```console
$ vercel dev
```

### デプロイ

```console
$ vercel
```
