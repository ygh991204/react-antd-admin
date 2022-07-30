
import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '@/utils'
import RouterLoading from './RouterLoading'
import useRoute from './useRoute'
import useRouter, { RouterOptions } from './useRouter'
import { routerBeforeEach } from './permission'

export type RouterGuardNext = (
  options?:
  | (RouterOptions & {
    replace?: boolean
  })
  | string
) => void

const RouterGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)

  const next: RouterGuardNext = useCallback((options) => {
    setAuth(true)
    if (options) {
      const _replace = !!(typeof options !== 'string' && options.replace)
      if (_replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
  }, [])

  useEffect(() => {
    setPageTitle(route.meta.title ? t(route.meta.title as any) : '')
    routerBeforeEach(route, next)
  }, [])

  return <>{auth ? children || RouterLoading : RouterLoading}</>
}

export default RouterGuard
