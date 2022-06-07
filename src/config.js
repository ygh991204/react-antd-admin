
const Config = {
  title: import.meta.env.VITE_APP_TITLE,
  tokenKey: import.meta.env.VITE_APP_TOKEN_KEY,
  tokenExpires: Number(import.meta.env.VITE_APP_TOKEN_EXPIRES),
  lang: import.meta.env.VITE_APP_LANG,
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  env: import.meta.env.VITE_APP_NODE
}

export default Config
