const assetFileExts = {
  media: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
  img: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  fonts: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  css: /\.(css)(\?.*)?$/
}

/**
 *
 * @param {boolean} isBuild
 * @param {object} env
 * @returns {import("vite").BuildOptions}
 */
export function createBuild(isBuild, env) {
  return {
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
          vendor: ['lodash', 'qs', 'axios']
        },
        chunkFileNames: 'static/js/chunk-[name]-[hash].js',
        entryFileNames: 'static/js/entry-[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const ext = name.substring(name.lastIndexOf('.'))
          const extType = Object.keys(assetFileExts).sort().filter(v => assetFileExts[v].test(ext))[0] || '[ext]'
          return `static/${extType}/[name]-[hash].[ext]`
        }
      }
    }
  }
}
