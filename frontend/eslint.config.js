import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import gitignore from 'eslint-config-flat-gitignore';

export default [
  gitignore(),
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts,vue}'], plugins: { js } },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/strongly-recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 4
          },
          multiline: {
            max: 1
          }
        }
      ]
    }
  }
];
