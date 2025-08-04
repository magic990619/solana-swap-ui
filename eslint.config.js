const expoConfig = require('eslint-config-expo/flat');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
      // Add other custom rules here if needed
    },
  },
  {
    ignores: ['node_modules/', '.expo/', 'dist/', 'build/'],
  },
]);
