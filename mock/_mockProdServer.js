
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import apis from './apis.js'

export function setupProdMockServer() {
  createProdMockServer([...apis])
}
