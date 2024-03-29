import type { BuildOptions } from 'vite'
import { isBuild } from './constant'

const assetFileExts: ITypeObject<RegExp> = {
  media: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
  img: /\.(png|jpeg|jpg|gif|svg)$/,
  fonts: /\.(woff2|woff|eot|ttf|otf)$/i,
  css: /\.(css)$/i,
  js: /\.(js)$/i
}

export const build: BuildOptions = {
  target: 'es2015',
  cssTarget: 'chrome80',
  assetsDir: 'static',
  sourcemap: !isBuild,
  cssCodeSplit: true,
  emptyOutDir: true,
  brotliSize: false,
  chunkSizeWarningLimit: 2000,
  rollupOptions: {
    output: {
      manualChunks: {
        lib: ['react', 'react-router-dom', 'react-dom'],
        vendor: ['lodash-es', 'qs', 'axios']
      },
      chunkFileNames: (chunkInfo) => {
        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
        const fileName = facadeModuleId[facadeModuleId.length - 2]
        if (fileName) {
          return `static/js/${fileName}-[name]-[hash].js`
        }
        return `static/js/[name]-[hash].js`
      },
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: (assetFile) => {
        const ext = assetFile.name ? assetFile.name.substring(assetFile.name.lastIndexOf('.')) : ''
        const extType = Object.keys(assetFileExts).filter(v => assetFileExts[v].test(ext))[0] || '[ext]'
        return `static/${extType}/[name]-[hash].[ext]`
      }
    }
  }
}
