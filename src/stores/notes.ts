import type { Note } from '@/types/index'
import pages from '~pages'

export const allNotes = computed(() => {
  return pages.filter(page => page.path.startsWith('/note/')).map((page) => {
    return {
      ...page.meta,
      path: page.path,
    }
  }) as Note[]
})
