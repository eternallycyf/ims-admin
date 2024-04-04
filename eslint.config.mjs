import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  typescript: {
    overrides: {
      'ts/no-unused-vars': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports-ts': 'warn',
      'ts/ban-ts-comment': 'off',
    },
  },
  react: {
    overrides: {
      'react/jsx-uses-vars': 'warn',
      'react/no-unknown-property': 'off',
    },
  },
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: 'prettier',
  },
  ignores: [
    '*.sh',
    '**/*.sh/**',
    'node_modules',
    '**/node_modules/**',
    '*.lock',
    '**/*.lock/**',
    '**/*.svg',
    '**/*.md',
    '**/*.ejs',
    '**/*.html',
    '**/*.png',
    '**/*.toml',
    '.vscode',
    '**/.vscode/**',
    '.idea',
    '**/.idea/**',
    'dist',
    '**/dist/**',
    'public',
    'public/**',
    'docs',
    'docs/**',
    '.husky',
    '**/.husky/**',
    '.local',
    '**/.local/**',
    'bin',
    'bin/**',
    'Dockerfile',
    '**/Dockerfile/**',
    'pnpm-lock.yaml',
    '**/pnpm-lock.yaml/**',
    'tsconfig.node.json',
    '**/tsconfig.node.json/**',
    'shims.d.ts',
    '**/shims.d.ts/**',
    'src/theme/init/initLessVar.js',
  ],
})
