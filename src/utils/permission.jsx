
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import store from '@/store'

/**
 *
 * @param {string[]} permissions
 */
export const checkAuth = (permissions, userPermissions) => {
  let _permissions = []
  if (userPermissions) {
    _permissions = userPermissions
  } else {
    const state = store.getState()
    _permissions = state ? state.user.permissions : []
  }
  return _permissions.some(role => {
    return permissions.includes(role)
  })
}

/**
 *
 * @param {string[]} permissions
 */
export const useAuth = (permissions) => {
  const userPermissions = useSelector(state => state.user.permissions)
  const isAuth = useMemo(() => {
    return checkAuth(permissions, userPermissions)
  }, [permissions, userPermissions])
  return isAuth
}

export const Auth = ({ permissions = [], render, children }) => {
  const auth = useAuth(permissions)
  return <>{ auth ? (render || children || null) : null }</>
}
