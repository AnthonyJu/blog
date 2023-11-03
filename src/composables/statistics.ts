import pages from '~pages'

interface StatisticsItem {
  name: 'blog' | 'note' | 'roast'
  path: '/blog' | '/note' | '/roast'
  count: number
}

const allCount = computed(() => {
  return {
    blog: pages.filter(page => page.path.startsWith('/blog/')).length,
    note: pages.filter(page => page.path.startsWith('/note/')).length,
    roast: allRoasts.length,
  }
})

export const newCount = reactive({
  blog: 0,
  note: 0,
  roast: 0,
})

export function setCount(type: 'blog' | 'note' | 'roast') {
  localStorage.setItem(`prev-${type}-count`, String(allCount.value[type]))
}

export function useStatistics() {
  const statistics: StatisticsItem[] = [
    { name: 'blog', path: '/blog', count: allCount.value.blog },
    { name: 'note', path: '/note', count: allCount.value.note },
    { name: 'roast', path: '/roast', count: allCount.value.roast },
  ]

  onMounted(() => {
    const prevBlogCount = localStorage.getItem('prev-blog-count')
    const prevNoteCount = localStorage.getItem('prev-note-count')
    const prevRoastCount = localStorage.getItem('prev-roast-count')

    newCount.blog = prevBlogCount ? allCount.value.blog - Number(prevBlogCount) : 0
    newCount.note = prevNoteCount ? allCount.value.note - Number(prevNoteCount) : 0
    newCount.roast = prevRoastCount ? allCount.value.roast - Number(prevRoastCount) : 0
  })

  return { statistics, newCount }
}
