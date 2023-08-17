import type { RouteRecordRaw } from 'vue-router'
import AvatarPng from '@/assets/avatar.png'
import type { BlogInfo } from '@/types/index'

export function getAllBlogs(pages: RouteRecordRaw[]) {
  // 获取所有博客的封面图
  const allPoster = import.meta.glob<{ default: string }>(
    '../pages/blog/**/poster.png',
    { eager: true },
  )
  // 获取所有博客的信息
  const allBlogs = pages
    .filter(page => page.path.startsWith('/blog/'))
    .map((page) => {
      const posterPath = `../pages${page.path}/poster.png`
      return {
        ...page.meta,
        path: page.path,
        poster: allPoster[posterPath]?.default ?? AvatarPng,
      }
    }) as BlogInfo[]

  return allBlogs
}
