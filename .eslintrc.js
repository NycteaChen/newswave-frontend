module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'airbnb-base', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'linebreak-style': 'off',
    'no-shadow': 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': ['error']
  }
};
