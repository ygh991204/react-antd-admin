import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

import store from '@/store'
import Config from '@/config'

import storage from './storage'

export const getToken = () => Cookies.get(Config.tokenKey)
export const setToken = (token, rememberMe) =>
  rememberMe
    ? Cookies.set(Config.tokenKey, token, { expires: Config.tokenExpires })
    : Cookies.set(Config.tokenKey, token)
export const removeToken = () => Cookies.remove(Config.tokenKey)

export const getLanguage = () => storage.get('lang') || Config.lang
export const setLanguage = (ln) => storage.set('lang', ln)

/**
 *
 * @param {string[]} permissions
 */
export function checkAuth(permissions, userPermissions) {
  let _permissions = []
  if (userPermissions) {
    _permissions = userPermissions
  } else {
    const state = store.getState()
    _permissions = state ? state.user.permissions : []
  }
  return _permissions.some((role) => {
    return permissions.includes(role)
  })
}

/**
 *
 * @param {string[]} permissions
 */
export function useAuth(permissions) {
  const userPermissions = useSelector((state) => state.user.permissions)
  const isAuth = useMemo(() => {
    return checkAuth(permissions, userPermissions)
  }, [permissions, userPermissions])
  return isAuth
}
