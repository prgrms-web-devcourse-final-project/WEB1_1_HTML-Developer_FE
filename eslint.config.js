import { fixupPluginRules } from '@eslint/compat';
import eslintJS from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const patchedImportPlugin = fixupPluginRules(eslintPluginImport);

const baseESLintConfig = {
  name: 'eslint',
  extends: [eslintJS.configs.recommended],
  rules: {
    'no-await-in-loop': 'warn',
    'require-atomic-updates': 'error',
    'no-promise-executor-return': 'error',
    'no-constant-binary-expression': 'warn',
    'no-self-compare': 'warn',
    'no-template-curly-in-string': 'warn',
  },
};

const typescriptConfig = {
  name: 'typescript',
  extends: [...typescriptEslint.configs.recommendedTypeChecked],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
    globals: {
      ...globals.builtin,
      ...globals.browser,
      ...globals.es2025,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  plugins: {
    import: patchedImportPlugin,
  },
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};

const reactConfig = {
  name: 'react',
  extends: [eslintPluginReact.configs.flat['jsx-runtime']],
  plugins: {
    'react-hooks': patchedReactHooksPlugin,
    'react-refresh': eslintPluginReactRefresh,
  },
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': 'warn',
    ...patchedReactHooksPlugin.configs.recommended.rules,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};

const jsxA11yConfig = {
  name: 'jsxA11y',
  ...jsxA11yPlugin.flatConfigs.recommended,
  plugins: {
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
  },
};

const eslintConfig = typescriptEslint.config(
  baseESLintConfig,
  typescriptConfig,
  eslintConfigPrettier,
  reactConfig,
  jsxA11yConfig
);

eslintConfig.map((config) => {
  config.files = ['src/**/*.ts', 'src/**/*.tsx'];
});

export default eslintConfig;
