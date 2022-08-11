import type { MutableRefObject } from 'react'
import { useState, useCallback, useRef } from 'react'
import { isFunction } from '@/utils/validate'

export default function useStateSync<S = any>(
  initState: S | (() => S)
): [S, (action: S | ((state: S) => S)) => void, MutableRefObject<S>] {
  const [state, setSate] = useState(isFunction(initState) ? initState() : initState)
  const ref = useRef(state)
  const dispatch = useCallback((setStateAction: S | ((state: S) => S)) => {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction
    setSate(ref.current)
  }, [])
  return [state, dispatch, ref]
}
