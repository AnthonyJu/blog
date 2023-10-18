import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'
import anthony_ju from '@anthony-ju/eslint-config'

export default antfu(
  { ...anthony_ju, ignorePatterns: ['*.js,*.d.ts'] },
  unocss.configs.flat,
)
