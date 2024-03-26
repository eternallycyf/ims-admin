import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

function withOpacityValue(variable: string) {
  return `rgba(var(${variable}), %alpha)`;
}

export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  theme: {
    colors: {
      primary: {
        extralight: withOpacityValue('--color-primary-extralight'),
        light: withOpacityValue('--color-primary-light'),
        medium: withOpacityValue('--color-primary-medium'),
        DEFAULT: withOpacityValue('--color-primary'),
        dark: withOpacityValue('--color-primary-dark'),
      },
      black: withOpacityValue('--color-black'),
      white: withOpacityValue('--color-white'),
    },
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
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({}),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [/^m-([\\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([\\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
});
