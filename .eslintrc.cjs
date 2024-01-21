module.exports = {
  root: true,
  extends: ['@antfu/eslint-config-ts', 'plugin:prettier/recommended'],
  rules: {
    'new-cap': 'off',
    'no-console': 'off',
    'antfu/if-newline': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
  },
}
