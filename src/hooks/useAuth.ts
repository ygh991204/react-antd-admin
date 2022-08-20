import { useMemo } from 'react'
import{ useAppSelector } from '@/store'
import { checkAuth } from '@/utils/auth'

export default function useAuth(permissions: string[]) {
  const userPermissions = useAppSelector((state) => state.user.permissions)
  const isAuth = useMemo(() => {
    return checkAuth(permissions, userPermissions)
  }, [permissions, userPermissions])
  return isAuth
}
