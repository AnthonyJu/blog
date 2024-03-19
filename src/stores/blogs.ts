import AvatarPng from '@/assets/avatar.png'

const blogPosters = import.meta.glob<{ default: string }>(
  '../pages/blog/**/poster.png',
  { eager: true },
)

export const allBlogs = computed(() => {
  return blogRoutes.map((page) => {
    const posterPath = `../pages${page.name as string}poster.png`
    return {
      path: (page.name as string).slice(0, -1),
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
