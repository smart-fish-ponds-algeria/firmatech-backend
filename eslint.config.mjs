import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import securityPlugin from 'eslint-plugin-security'
import importPlugin from 'eslint-plugin-import'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  { ignores: ['dist/**/*'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      security: securityPlugin,
      import: importPlugin,
      perfectionist: perfectionistPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // Specific rule configurations
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-require': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
      'import/no-unused-modules': 'error',
      'import/order': [
        'off',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
)
