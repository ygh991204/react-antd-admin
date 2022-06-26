import { viteMockServe } from 'vite-plugin-mock'
// import path from 'path'

/**
 * @see https://github.com/vbenjs/vite-plugin-mock
 */
export default (isBuild, env) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    supportTs: false,
    localEnabled: !isBuild,
    prodEnabled: isBuild
    /** injectFile, 注入存在问题 */
    // injectFile: path.resolve(process.cwd(), 'src/main.jsx'),
    // injectCode: `
    // import { setupProdMockServer } from '../mock/_prodServer'
    // setupProdMockServer()
    //     `
  })
}
