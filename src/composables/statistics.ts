interface StatisticsItem {
  name: 'blog' | 'note' | 'roast'
  path: '/blog' | '/note' | '/roast'
  count: number
}

const allCount = computed(() => {
  return {
    blog: blogRoutes.length,
    note: noteRoutes.length,
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

    if (prevBlogCount == null) {
      localStorage.setItem('prev-blog-count', String(allCount.value.blog))
    }
    else {
      newCount.blog = allCount.value.blog - Number(prevBlogCount)
    }

    if (prevNoteCount == null) {
      localStorage.setItem('prev-note-count', String(allCount.value.note))
    }
    else {
      newCount.note = allCount.value.note - Number(prevNoteCount)
    }

    if (prevRoastCount == null) {
      localStorage.setItem('prev-roast-count', String(allCount.value.roast))
    }
    else {
      newCount.roast = allCount.value.roast - Number(prevRoastCount)
    }
  })

  return { statistics, newCount }
}
