import { resolve } from 'node:path'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import UnoCSS from 'unocss/vite'
import { generate } from '@ant-design/colors'
import { theme } from 'antd'

export const DEFAULT_PRIMARY_COLOR = '#1677ff'

const { getDesignToken } = theme

const { defaultAlgorithm, defaultSeed } = theme

function generateAntColors(color: string, theme: 'default' | 'dark' = 'default') {
  return generate(color, {
    theme,
  })
}

export function generateModifyVars(): any {
  const palettes = generateAntColors(DEFAULT_PRIMARY_COLOR)
  const primary = palettes[5]
  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++)
    primaryColorObj[`primary-${index + 1}`] = palettes[index]

  const mapToken = defaultAlgorithm(defaultSeed)

  return {
    ...getDesignToken(),
    ...mapToken,
    // reference:  Avoid repeated references
    'hack': `true; @import (reference) "${resolve('src/style/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
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
  define: {
    DEFAULT_PRIMARY_COLOR: JSON.stringify(DEFAULT_PRIMARY_COLOR),
  },
  plugins: [
    UnoCSS(),
    react(),
    svgr(),
    // 同步tsconfig.json的path设置alias
    tsconfigPaths(),
    vitePluginFakeServer({
      logger: false,
      include: 'mock',
      infixName: false,
      enableDev: true,
      enableProd: true,
    }),
    // createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    // iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    // symbolId: 'icon-[dir]-[name]',
    // }),
    visualizer({
      open: false,
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
      },
      '/file': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/file/, ''),
      },
      '/ws': {
        target: 'ws://localhost:7000',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/ws/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         // 让每个插件都打包成独立的文件
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //       return null;
    //     },
    //   },
    // },
    // terserOptions: {
    //   compress: {
    //     // 生产环境移除console
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
  },
})
