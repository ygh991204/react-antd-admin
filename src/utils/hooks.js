
import { useEffect, useState, useCallback, useRef } from 'react'
import { isFunction } from './validate'

const getWindowWidth = () => document.body.getBoundingClientRect().width - 1

export function useResize() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())
  const handleResize = useCallback(() => {
    setWindowWidth(getWindowWidth())
  }, [])
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('reset', handleResize)
    }
  }, [])
  return {
    windowWidth
  }
}

export function useStateSync(initState) {
  const [state, setSate] = useState(initState)
  const ref = useRef(state)
  const dispatch = useCallback((setStateAction) => {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction
    setSate(ref.current)
  })
  return [state, dispatch, ref]
}

/**
 *
 * @param {Function} fn
 */
export function useSyncCallback(fn) {
  const [proxyState, setProxyState] = useState({ current: false })

  const Func = useCallback(() => {
    setProxyState({ current: true })
  }, [proxyState])

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false })
  }, [proxyState])

  useEffect(() => {
    proxyState.current && fn()
  })

  return Func
}
