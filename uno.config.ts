import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  presetTagify,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

// function withOpacityValue(variable: string) {
//   return `rgba(var(${variable}), %alpha)`;
// }

export default defineConfig({
  shortcuts: [
    {
      center: 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
      btn: 'p-2 font-semibold rounded-lg select-none cursor-pointer hover:bg-[#8882] dark:hover:bg-[#fff2]',
    },
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
    // colors: {
    //   primary: {
    //     extralight: withOpacityValue('--color-primary-extralight'),
    //     light: withOpacityValue('--color-primary-light'),
    //     medium: withOpacityValue('--color-primary-medium'),
    //     DEFAULT: withOpacityValue('--color-primary'),
    //     dark: withOpacityValue('--color-primary-dark'),
    //   },
    //   black: withOpacityValue('--color-black'),
    //   white: withOpacityValue('--color-white'),

    //   green: '#00A76F',
    //   blue: '#1fb6ff',
    //   purple: '#7e5bef',
    //   pink: '#ff49db',
    //   orange: '#ff7849',
    //   yellow: '#ffc82c',
    //   gray: '#637381',
    //   hover: '#63738114',

    //   success: '#22c55e',
    //   warning: '#ff7849',
    //   error: '#ff5630',
    //   info: '#00b8d9',

    //   code: '#d63384',

    //   'gray-100': '#F9FAFB',
    //   'gray-200': '#F4F6F8',
    //   'gray-300': '#DFE3E8',
    //   'gray-400': '#C4CDD5',
    //   'gray-500': '#F9FAFB',
    //   'gray-600': '#637381',
    //   'gray-700': '#454F5B',
    //   'gray-800': '#212B36',
    //   'gray-900': '#161C24',
    // },
    // spacing: {
    //   xss: '4px',
    //   xs: '8px',
    //   sm: '12px',
    //   base: '16px',
    //   lg: '24px',
    //   xl: '32px',
    // },
    fontFamily: {
      code: 'FiraCode',
      mone: 'OperatorMono',
      moneItalic: 'OperatorMonoItalic',
    },
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    // presetRemToPx({
    //   baseFontSize: 4,
    // }),
    presetAttributify({
      prefix: 'ims-',
      prefixedOnly: true,
    }),
    presetTypography(),
    presetTagify({
      prefix: 'ims-',
      extraProperties: { display: 'block' },
    }),
    presetIcons({
      extraProperties: {
        scale: '1.2',
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'middle',
      },
      warn: true,
    }),
    presetWebFonts({
      provider: 'google', // 默认提供者
      fonts: {
        // 这些将扩展默认主题
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        // 自定义的
        lobster: 'Lobster',
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    // [
    //   'p-safe',
    //   {
    //     padding:
    //       'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
    //   },
    // ],
    // ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    // ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    [/^m-([\\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([\\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [/^bg-?([0123456789abcdef]+)$/i, ([_, rgb]) => ({ background: `#${rgb}` })],
  ],
});
