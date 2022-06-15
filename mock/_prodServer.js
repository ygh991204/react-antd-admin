
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules = import.meta.globEager('./**/*.js')

const mockModules = []
Object.keys(modules).forEach((key) => {
  if (!key.includes('/_') && modules[key].default) {
    mockModules.push(...modules[key].default)
  }
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
