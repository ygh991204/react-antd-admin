
import loadable from '@loadable/component'
import RouterLoading from './RouterLoading'

const pageFiles = import.meta.glob('@/pages/**/index.tsx')

const pages = Object.keys(pageFiles)
  .sort()
  .reduce((pages, pagePath) => {
    const key = pagePath.replace('../pages/', '').replace('/index.tsx', '')
    pages[key] = pageFiles[pagePath]
    return pages
  }, {} as ITypeObject<any>)

function routerLazy(path: string) {
  return loadable(pages[path], {
    fallback: RouterLoading
  })
}

export default routerLazy
