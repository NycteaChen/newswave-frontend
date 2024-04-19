module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'airbnb-base', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'linebreak-style': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
