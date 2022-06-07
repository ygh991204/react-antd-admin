import Cookies from 'js-cookie'
import Config from '@/config'

export const getToken = () => Cookies.get(Config.tokenKey)

export const setToken = (token, rememberMe) =>
  rememberMe ? Cookies.set(Config.tokenKey, token, { expires: Config.tokenExpires }) : Cookies.set(Config.tokenKey, token)

export const removeToken = () => Cookies.remove(Config.tokenKey)
