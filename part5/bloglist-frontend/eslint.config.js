import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ['**/*.js', '**/*.jsx'] },
  ...compat.extends('airbnb'),
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'no-underscore-dangle': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'react/button-has-type': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/display-name': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['vite.config.js', 'eslint.config.js'],
        },
      ],
    },
  },
];
