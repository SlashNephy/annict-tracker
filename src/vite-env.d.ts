/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  // https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
  readonly VITE_CF_PAGES_COMMIT_SHA?: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv
}
