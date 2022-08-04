import { useCallback, useState, useLayoutEffect } from 'react'

export function getWindowWidth() {
  return document.body.getBoundingClientRect().width
}

export default function() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())
  const handleResize = useCallback(() => {
    setWindowWidth(getWindowWidth())
  }, [])
  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('reset', handleResize)
    }
  }, [])
  return {
    windowWidth
  }
}
