import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import type { UserModule } from './types'
import { routerOptions } from './modules/router'

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  routerOptions,
  (ctx) => {
    const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })
    Object.values(modules).forEach(i => i.install?.(ctx))
  },
)
