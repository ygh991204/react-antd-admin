
import { viteMockServe } from 'vite-plugin-mock'

export default (isBuild, env) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    supportTs: false
    // localEnabled: !isBuild,
    // prodEnabled: isBuild,
    // injectCode: `
    //       import { setupProdMockServer } from '../mock/_mockProdServer';
    //       setupProdMockServer();
    //     `
  })
}
