import type { Note } from '@/types/index'

export const allNotes = computed(() => {
  return (noteRoutes.map((page) => {
    return {
      ...page.meta,
      path: page.name as string,
    }
  }) as Note[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
})
