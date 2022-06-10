import { defineConfig, loadEnv } from 'vite'
import { createPlugins, createModifyVars, createBuild } from './build'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: createPlugins(isBuild, env),
    base: '/',
    server: {
      host: '127.0.0.1',
      port: 3000,
      open: true,
      proxy: {}
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: createModifyVars()
        }
      }
    },
    build: createBuild(isBuild, env)
  }
})
