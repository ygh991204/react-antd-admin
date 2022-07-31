import Config from '@/config'
import { isArray } from './validate'

export function wait(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delay)
  })
}

export function setPageTitle(title: string) {
  const _title = (!title) ? Config.title : (title + ' - ' + Config.title)
  document.title = _title
  return _title
}

export function toArray<T =any>(origin: T[] | T) {
  return isArray(origin) ? origin : [origin]
}

// export
