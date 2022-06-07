import Config from '@/config'

export const wait = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

export const setPageTitle = (title) => {
  const _title = (!title || title === 'no-name') ? Config.title : (title + ' - ' + Config.title)
  document.title = _title
  return _title
}
