import React, { useEffect, useState, useCallback, useRef } from 'react'
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

/**
 * 状态同步更新 useRef
 */
export function useStateSync<S = any>(
  initState: S | (() => S)
): [S, (action: S | ((state: S) => S)) => void, React.MutableRefObject<S>] {
  const [state, setSate] = useState(isFunction(initState) ? initState() : initState)
  const ref = useRef(state)
  const dispatch = useCallback((setStateAction: S | ((state: S) => S)) => {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction
    setSate(ref.current)
  }, [])
  return [state, dispatch, ref]
}

export function useNextTick() {
  const nextTick = useCallback((fn: () => void) => {
    setTimeout(() => {
      fn()
    }, 0)
  }, [])
  return nextTick
}
