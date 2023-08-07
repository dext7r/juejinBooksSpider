module.exports = {
  root: true,
  extends: ['@antfu/eslint-config-ts', 'plugin:prettier/recommended'],
  rules: {
    'new-cap': 'off',
    'no-console': 'off',
    'antfu/if-newline': 'off',
  },
}
