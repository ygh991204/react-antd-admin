/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production'
  readonly VITE_NODE: 'development' | 'production' | 'test'
  readonly VITE_TITLE: string
  readonly VITE_SHORT_TITLE: string
  readonly VITE_PROT: string
  readonly VITE_LANG: AppLange
  readonly VITE_TOKEN_KEY: string
  readonly VITE_TOKEN_EXPIRES: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
