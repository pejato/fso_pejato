import globals from 'globals';

import path from 'path';
import babelParser from '@babel/eslint-parser';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import prettier from 'prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        exit: true,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env'],
        },
      },
    },
    plugins: { prettier },
  },
  {
    ignores: ['dist', 'eslint.config.mjs'],
  },
  ...compat.extends('airbnb-base'),
  {
    rules: {
      'consistent-return': 'off',
    },
  },
];
