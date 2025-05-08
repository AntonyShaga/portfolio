import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
  },
];

export default eslintConfig;
