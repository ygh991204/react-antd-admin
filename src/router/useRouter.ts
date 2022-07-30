import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { omitBy } from 'lodash'

export interface RouterOptions<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject> {
  path: string
  query?: Q
  params?: P
}

/**
 * 路由跳转封装
 */
function useRouter<Q extends IAnyObject = IAnyObject, P extends IAnyObject = IAnyObject>() {
  const _navigate = useNavigate()

  const navigate = useCallback((options: RouterOptions | string, replace = false) => {
    if (typeof options === 'string') {
      _navigate(options, {
        replace
      })
    } else {
      const { query, params, path } = options
      const _query =
        query && Object.keys(query).length ?
          omitBy(query, (val) => val === undefined || val === null || val === '') :
          null
      const _path = path + (_query ? '?' + qs.stringify(_query) : '')
      const _params =
        params && Object.keys(params).length ?
          omitBy(params, (val) => val === undefined || val === null || val === '') :
          null
      _navigate(_path, {
        replace,
        state: _params
      })
    }
  }, [])

  const push = useCallback(<Qt extends Q = Q, Pt extends P = P>(options: RouterOptions<Qt, Pt> | string) => {
    navigate(options, false)
  }, [])

  const replace = useCallback(<Qt extends Q = Q, Pt extends P = P>(options: RouterOptions<Qt, Pt> | string) => {
    navigate(options, true)
  }, [])

  const go = useCallback((delta: number) => {
    _navigate(delta)
  }, [])

  const back = useCallback(() => {
    go(-1)
  }, [])

  return {
    push,
    replace,
    go,
    back
  }
}

export default useRouter
