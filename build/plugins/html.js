
import { createHtmlPlugin } from 'vite-plugin-html'

export default (isBuild, env) => {
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: env.VITE_TITLE
      }
    }
  })
}
