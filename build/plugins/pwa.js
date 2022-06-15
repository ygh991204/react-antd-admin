
import { VitePWA } from 'vite-plugin-pwa'

/**
 * @see https://github.com/antfu/vite-plugin-pwa
 */
export default (isBuild, env) => {
  return VitePWA({
    manifest: {
      name: env.VITE_TITLE,
      short_name: env.VITE_SHORT_TITLE,
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/logo-2.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
}
