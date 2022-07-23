import { useAuth } from '@/utils/auth'
import React from 'react'

const Auth: React.FC<{
  permissions: string[]
  render?: React.ReactNode
  children?: React.ReactNode
}> = ({ permissions, render, children }) => {
  const auth = useAuth(permissions)
  return <>{auth ? render || children || null : null}</>
}

export default Auth
