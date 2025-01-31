import html from '@html-eslint/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    plugins: {
      '@stylistic': stylistic,
      '@html-eslint': html,
    },
    rules: {
      ...stylistic.configs['recommended-flat'].rules,
      '@html-eslint/indent': ['error', 2],
    },
  },
  // your own configurations.
  {
    // recommended configuration included in the plugin
    ...html.configs['flat/recommended'],
    files: ['**/*.html'],
  },
]
