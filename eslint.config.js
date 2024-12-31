import unjs from 'eslint-config-unjs'

export default unjs({
  ignores: ['dist', 'node_modules'],
  rules: {
    'unicorn/no-anonymous-default-export': 0,
  },
})
