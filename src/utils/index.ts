import { EnvConfig } from '@/env'
import { isArray } from './validate'

/**
 * 延迟执行
 */
export function wait(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delay)
  })
}

/**
 * 设置页面标题 meta
 */
export function setPageTitle(title: string) {
  const _title = (!title) ? EnvConfig.APP_TITLE : (title + ' - ' + EnvConfig.APP_TITLE)
  document.title = _title
  return _title
}

/**
 * 转换数组
 */
export function toArray<T =any>(origin: T[] | T) {
  return isArray(origin) ? origin : [origin]
}
