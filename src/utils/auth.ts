import Cookies from 'js-cookie'
import store from '@/store'
import { EnvConfig } from '@/env'

export function getToken() {
  return Cookies.get(EnvConfig.APP_TOKEN_KEY)
}

export function setToken(token: string) {
  return Cookies.set(EnvConfig.APP_TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(EnvConfig.APP_TOKEN_KEY)
}

export function checkAuth(permissions: string[], userPermissions?: string[]) {
  let _permissions: string[] = []
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

