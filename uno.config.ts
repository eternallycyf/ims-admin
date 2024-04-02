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
    },
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
    spacing: {
      xss: '4px',
      xs: '8px',
      sm: '12px',
      base: '16px',
      lg: '24px',
      xl: '32px',
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
