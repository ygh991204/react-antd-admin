import { useCallback } from 'react'

export default function() {
  const nextTick = useCallback((fn: () => void) => {
    setTimeout(() => {
      fn()
    }, 0)
  }, [])
  return nextTick
}
