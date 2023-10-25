import { resolve, join } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  main: { plugins: [externalizeDepsPlugin()] },
  preload: { plugins: [externalizeDepsPlugin()] },
  renderer: {
    resolve: { alias: { '@': resolve('src/renderer/src') } },
    plugins: [
      vue(),
      vueJsx(),
      Pages({
        dirs: join(__dirname, 'src/renderer/src/pages'),
        routeStyle: 'nuxt',
        exclude: ['**/components/*.vue']
      })
    ]
  }
});
