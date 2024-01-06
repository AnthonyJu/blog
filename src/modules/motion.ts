import { MotionPlugin } from '@vueuse/motion'
import type { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.use(MotionPlugin)
}
