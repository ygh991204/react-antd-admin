
const Config = {
  title: import.meta.env.VITE_APP_TITLE,
  tokenKey: import.meta.env.VITE_TOKEN_KEY,
  tokenExpires: Number(import.meta.env.VITE_TOKEN_EXPIRES),
  lang: import.meta.env.VITE_LANG,
  baseUrl: import.meta.env.VITE_BASE_URL,
  env: import.meta.env.VITE_NODE
}

export default Config
