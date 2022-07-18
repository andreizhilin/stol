/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      https: true,
      proxy: {
        '/api': {
          target: env.API_BASE_URI,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [react(), mkcert(), svgr(), proxyJsAsset()],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

// HACK: Hack to return a proper content-type for js file from Yandex Object Storage
function proxyJsAsset() {
  const replaceFrom = '<script type="module" crossorigin src="/assets';
  const replaceTo = '<script type="module" crossorigin src="/api/assets';

  return {
    name: 'proxy-js-asset',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(replaceFrom, replaceTo);
    },
  };
}
