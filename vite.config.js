import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 必要に応じてエイリアスを追加
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  // Create React Appとの互換性のために環境変数のプレフィックスを設定
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build',
  },
  // publicディレクトリの設定
  publicDir: 'public',
  // Vitest設定
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
});
