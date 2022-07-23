import { useMemo } from 'react'
import Cookies from 'js-cookie'
import store, { useAppSelector } from '@/store'
import Config from '@/config'

export function getToken() {
  return Cookies.get(Config.tokenKey)
}

export function setToken(token: string, rememberMe?: boolean) {
  return rememberMe
    ? Cookies.set(Config.tokenKey, token, { expires: Config.tokenExpires })
    : Cookies.set(Config.tokenKey, token)
}

export function removeToken(){
  return Cookies.remove(Config.tokenKey)
}

export function checkAuth(permissions: string[], userPermissions?: string[]) {
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

export function useAuth(permissions: string[]) {
  const userPermissions = useAppSelector((state) => state.user.permissions)
  const isAuth = useMemo(() => {
    return checkAuth(permissions, userPermissions)
  }, [permissions, userPermissions])
  return isAuth
}
