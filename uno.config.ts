import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx-babel'

export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-between': 'flex justify-between items-center',
      'flex-end': 'flex justify-end items-center',
    },
  ],
  theme: {
    colors: {
      'white': 'var(--white)',
      'content-bg': 'var(--content-bg)',
      'success-color': 'var(--success-color)',
      'warning-color': 'var(--warning-color)',
      'error-color': 'var(--error-color)',
      'info-color': 'var(--info-color)',
      'success-background-color': 'var(--success-background-color)',
      'warning-background-color': 'var(--warning-background-color)',
      'error-background-color': 'var(--error-background-color)',
      'info-background-color': 'var(--info-background-color)',
      'primary-color': 'var(--primary-color)',
      'primary-hover-color': 'var(--primary-hover-color)',
      'primary-active-color': 'var(--primary-active-color)',
      'processing-color': 'var(--processing-color)',
      'link-color': 'var(--link-color)',
      'text-color': 'var(--text-color)',
      'border-color': 'var(--border-color)',
      'component-background': 'var(--component-background-color)',
      'layout-body-background': 'var(--layout-body-background)',
      'white-hover': 'var(--white-hover)',
      'white-active': 'var(--white-active)',
      'ims-bg': 'var(--ims-bg)',
    },
    fontFamily: {
      code: 'FiraCode',
      mone: 'OperatorMono',
      moneItalic: 'OperatorMonoItalic',
    },
    breakpoints: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
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
      // prefix: 'ims-',
      // prefixedOnly: true,
    }),
    presetTypography(),
    presetTagify({
      // prefix: 'ims-',
      extraProperties: { display: 'block' },
    }),
    presetIcons({
      extraProperties: {
        'scale': '1.2',
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'middle',
      },
      warn: true,
    }),
    presetWebFonts(),
  ],
  transformers: [transformerAttributifyJsx(), transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    // [/^m-([\\.\d]+)$/, ([_, num]) => ({ margin: `${num}` })],
    // [/^p-([\\.\d]+)$/, ([_, num]) => ({ padding: `${num}` })],
  ],
  safelist: 'p-1 p-2 p-3 p-4'.split(' '),
})
