import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import lightningcss from "vite-plugin-lightningcss"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      
      deno(),
      lightningcss({
        browserslist: 'last 3 versions',
        minify: true
      }),
      
  ],
  css: {
    transformer: 'lightningcss'
  },
  build: {
    cssMinify: 'lightningcss'
  },
})
