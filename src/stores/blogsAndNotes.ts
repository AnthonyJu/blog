import AvatarPng from '@/assets/avatar.png'
import type { BlogInfo, Note } from '@/types/index'
import pages from '~pages'

const blogPosters = import.meta.glob<{ default: string }>(
  '../pages/blog/**/poster.png',
  { eager: true },
)

export const allBlogs = computed(() => {
  return pages
    .filter(page => page.path.startsWith('/blog/'))
    .map((page) => {
      const posterPath = `../pages${page.path}/poster.png`
      return {
        path: page.path,
        poster: blogPosters[posterPath]?.default ?? AvatarPng,
        ...page.meta,
      }
    }) as BlogInfo[]
})

export const randomBlogs = computed(() => {
  const randoms: BlogInfo[] = []
  while (randoms.length < Math.min(4, allBlogs.value.length)) {
    const index = Math.floor(Math.random() * allBlogs.value.length)
    const blog = allBlogs.value[index]
    if (!randoms.includes(blog)) randoms.push(blog)
  }
  return randoms
})

export const allNotes = computed(() => {
  return pages.filter(page => page.path.startsWith('/note/')).map((page) => {
    return {
      ...page.meta,
      path: page.path,
    }
  }) as Note[]
})
