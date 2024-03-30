module.exports = {
  plugins: {
    'postcss-import': {},
    '@unocss/postcss': {
      content: ['**/*.{html,js,ts,jsx,tsx}'],
    },
    'autoprefixer': {},
  },
}
