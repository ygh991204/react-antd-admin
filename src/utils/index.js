import Config from '@/config'

export function wait(delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

export function setPageTitle(title) {
  const _title = (!title || title === 'no-name') ? Config.title : (title + ' - ' + Config.title)
  document.title = _title
  return _title
}

export function delEmptyQueryNodes(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    value && typeof value === 'object' && delEmptyQueryNodes(value);
    (value === '' || value === null || value === undefined || value.length === 0 || Object.keys(value).length === 0) && delete obj[key]
  })
  return obj
}
