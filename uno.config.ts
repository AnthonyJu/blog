import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'full': 'w-full h-full',
    'flex-col': 'flex flex-col',
    'flex-items': 'flex items-center',
    'flex-b-c': 'flex justify-between items-center',
    'flex-center': 'flex justify-center items-center',
    'flex-center-r': 'flex justify-end items-center',
    'flex-col-center': 'flex flex-col justify-center items-center',
    'turn-dark': 'invert-100 hue-rotate-180',
    'text-primary': 'text-$el-color-primary',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      // cdn: 'https://esm.sh/',
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left query-target'.split(' '),
})
