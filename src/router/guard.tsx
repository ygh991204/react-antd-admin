
import type { PropsWithChildren } from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { setPageTitle } from '@/utils'
import { RouterLoading } from '@/router'
import { RouterOptions, useRoute, useRouter } from '@/router/hook'
import { routerBeforeEach } from './permission'

export type RouterGuardNext = (
  options?:
  | (RouterOptions & {
    replace?: boolean
  })
  | string
) => void

export function RouterGuard({ children }: PropsWithChildren) {
  const route = useRoute()
  const router = useRouter()
  const { t } = useTranslation()
  const [auth, setAuth] = useState(false)

  const next: RouterGuardNext = useCallback((options) => {
    if (options) {
      const _replace = !!(typeof options !== 'string' && options.replace)
      if (_replace) {
        router.replace(options)
      } else {
        router.push(options)
      }
    }
    setAuth(true)
  }, [])

  useEffect(() => {
    setPageTitle(route.meta.title ? t(route.meta.title as any) : '')
    routerBeforeEach(route, next)
  }, [])

  return <>{auth ? children || <RouterLoading/> : <RouterLoading/>}</>
}
