import { useCallback, useRef, useState, useEffect } from 'react'

type Func = () => void

/**
 * 类似 Vue 的 $nextTick
 */
export default function() {
  const funcs = useRef<Func[]>([])
  const [state, setState] = useState({})
  const nextTick = useCallback((func: Func) => {
    funcs.current.push(func)
    setState({})
  }, [])
  useEffect(() => {
    if (funcs.current.length) {
      funcs.current.forEach(func => {
        func()
      })
      funcs.current = []
    }
  }, [state])
  return nextTick
}
