// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    // 稀にこれが必要な場合があります
    fs: {
      strict: false
    }
  },
  // プレビュー時の最適化を少し緩める設定
  optimizeDeps: {
    exclude: ['@sveltejs/kit'] 
  }
});