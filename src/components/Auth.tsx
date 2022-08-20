
import type { ReactNode, PropsWithChildren } from 'react'
import useAuth from '@/hooks/useAuth'

export type AuthProps = PropsWithChildren<{
  permissions: string[]
  render?: ReactNode
}>

function Auth({ permissions, render, children }: AuthProps) {
  const auth = useAuth(permissions)
  return <>{auth ? render || children || null : null}</>
}

export default Auth
