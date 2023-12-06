import antfu from '@antfu/eslint-config'
import ant_ju from '@anthony-ju/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignorePatterns: ant_ju.ignorePatterns,
    rules: {
      ...ant_ju.rules,
      'max-len': 'off',
    },
  },
)
