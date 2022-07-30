
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.globEager('./**/*.ts')

const mockModules: any[] = []

Object.keys(modules).forEach((key) => {
  if (!key.includes('/_') && modules[key].default) {
    mockModules.push(...modules[key].default)
  }
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
