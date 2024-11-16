import { Agent } from 'node:https'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { initGlobalLessVaribles } from './src/theme/initLessVar.js'

export function generateModifyVars(): any {
  return {
    ...initGlobalLessVaribles,
    // reference:  Avoid repeated references
    hack: `true; @import (reference) "${resolve('src/style/config.less')}";`,
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  css: {
    // 开css sourcemap方便找css
    devSourcemap: true,
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
  json: {
    namedExports: true,
    stringify: true,
  },
  define: {},
  plugins: [
    UnoCSS(),
    react(),
    // 同步tsconfig.json的path设置alias
    tsconfigPaths(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve('src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    // 自动打开浏览器
    open: true,
    host: true,
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        // https://github.com/vitejs/vite/discussions/8998#discussioncomment-4408695
        agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
      },
      '/file': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/file/, ''),
        // https://github.com/vitejs/vite/discussions/8998#discussioncomment-4408695
        agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
      },
      '/ws': {
        target: 'ws://localhost:7000',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/ws/, ''),
        // https://github.com/vitejs/vite/discussions/8998#discussioncomment-4408695
        agent: new Agent({ keepAlive: true, keepAliveMsecs: 20000 }),
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'antd'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000, // 提高警告阈值到 1000 KB
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-antd': ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
          'vendor-utils': ['axios', 'dayjs', 'i18next', 'zustand'],
          'vendor-ui': ['framer-motion', 'styled-components', '@iconify/react'],
        },
      },
    },
    terserOptions: {
      compress: {
        // 生产环境移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
