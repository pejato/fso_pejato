import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('airbnb-base'),
  // { rules: { 'operator-linebreak': 'off' } },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-restricted-syntax': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
    }
  }
];
