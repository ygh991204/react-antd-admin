
const Config = {
  title: import.meta.env.VITE_TITLE,
  tokenKey: import.meta.env.VITE_TOKEN_KEY,
  tokenExpires: Number(import.meta.env.VITE_TOKEN_EXPIRES),
  language: import.meta.env.VITE_LANGUAGE,
  baseUrl: import.meta.env.VITE_BASE_URL,
  env: import.meta.env.VITE_ENV,
  mode: import.meta.env.VITE_MODE
}

export default Config
