// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*', '/app-example/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
