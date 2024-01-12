import type { RouterOptions } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import { routes } from 'vue-router/auto/routes'
import type { UserModule } from '@/types'

export const routerOptions: RouterOptions = {
  routes: setupLayouts(routes),
  base: import.meta.env.BASE_URL,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0 })
      }, 500)
    })
  },
}

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((_to, _from, next) => {
      next()
    })
  }
}
