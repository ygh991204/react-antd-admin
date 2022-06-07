
import { useLayoutEffect, useEffect, useState, useCallback } from 'react'

/**
 *
 * @param {Function} fn
 */
export const useWillMount = (fn) => {
  useLayoutEffect(() => {
    fn()
  }, [])
}

/**
 *
 * @param {Function} fn
 */
export const useDidMount = (fn) => {
  useEffect(() => {
    fn()
  }, [])
}

/**
 *
 * @param {Function} fn
 */
export const useWillUnmount = (fn) => {
  useEffect(() => {
    return fn
  }, [])
}

const getWindowWidth = () => document.body.getBoundingClientRect().width - 1

export const useResize = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())
  const handleResize = useCallback(() => {
    setWindowWidth(getWindowWidth())
  }, [])
  useDidMount(() => {
    window.addEventListener('resize', handleResize)
  })
  useWillUnmount(() => {
    window.removeEventListener('reset', handleResize)
  })
  return {
    windowWidth
  }
}

