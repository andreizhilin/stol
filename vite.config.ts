/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      https: true,
      proxy: {
        '/api': {
          target: env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [react(), mkcert()],
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
